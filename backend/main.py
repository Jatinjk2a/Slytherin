from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, PlainTextResponse
from collections import defaultdict
import logging
import time

from models.schemas import (
    GenerateRequest,
    GenerateResponse,
    PreviewResponse,
    ErrorResponse,
    RegenerateRequest,
    ReadmeStyle,
)
from services.github_parser import parse_repo
from services.readme_generator import generate_readme
from services.regenerator import regenerate_readme
from services.scoring import score_repository
from cache import metadata_cache, readme_cache, readme_cache_key
from database import verify_db_connection, repositories_collection, readmes_collection, scores_collection
from models.db_models import RepositoryDB, ReadmeDB, ScoreDB

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="ReadmeAI",
    description=(
        "Generate production-quality README files from any public GitHub repository URL.\n\n"
        "**Pipeline:** GitHub API → repo metadata → Claude AI → Markdown README"
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Simple in-process rate limiter (IP-based) ─────────────────────────────────
_rate_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 10          # requests
RATE_WINDOW = 60         # per second window


def _check_rate_limit(ip: str):
    now = time.monotonic()
    hits = _rate_store[ip]
    # Purge old entries
    _rate_store[ip] = [t for t in hits if now - t < RATE_WINDOW]
    if len(_rate_store[ip]) >= RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail=f"Rate limit exceeded: {RATE_LIMIT} requests per {RATE_WINDOW}s per IP.",
        )
    _rate_store[ip].append(now)


# ── Middleware ─────────────────────────────────────────────────────────────────
@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = round((time.perf_counter() - start) * 1000, 2)
    response.headers["X-Process-Time-Ms"] = str(elapsed)
    return response


@app.on_event("startup")
async def startup_db():
    await verify_db_connection()


async def save_to_db(repo_url: str, metadata, readme_content: str, score_data: dict):
    if repositories_collection is None:
        return
        
    try:
        repo_db = RepositoryDB(repo_name=metadata.name, github_url=repo_url)
        readme_db = ReadmeDB(repo_id=repo_db.id, content=readme_content)
        score_db = ScoreDB(
            repo_id=repo_db.id, 
            score_breakdown=score_data["score_breakdown"],
            total_score=score_data["total_score"]
        )
        
        await repositories_collection.insert_one(repo_db.model_dump(by_alias=True))
        await readmes_collection.insert_one(readme_db.model_dump(by_alias=True))
        await scores_collection.insert_one(score_db.model_dump(by_alias=True))
    except Exception as e:
        logger.error(f"Failed to save to DB: {e}")


# ── Exception handlers ─────────────────────────────────────────────────────────
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=422,
        content=ErrorResponse(error="Validation Error", detail=str(exc)).model_dump(),
    )


@app.exception_handler(Exception)
async def generic_error_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(error="Internal Server Error", detail=str(exc)).model_dump(),
    )


# ── Health ─────────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "ReadmeAI",
        "status": "running",
        "version": "1.0.0",
        "endpoints": ["/generate", "/regenerate", "/preview", "/cache/stats", "/cache/bust"],
    }


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "cache": metadata_cache.stats()}


# ── Core: Generate ─────────────────────────────────────────────────────────────
@app.post(
    "/generate",
    response_model=GenerateResponse,
    tags=["README"],
    summary="Generate a README from a GitHub repo URL",
)
async def generate(req: GenerateRequest, request: Request, background_tasks: BackgroundTasks):
    """
    Full pipeline:
    1. Check README cache (skip GitHub + Claude if hit)
    2. Parse the GitHub repo (or use metadata cache)
    3. Call Claude to generate the README
    4. Cache and return
    """
    ip = request.client.host if request.client else "unknown"
    _check_rate_limit(ip)

    cache_key = readme_cache_key(req.repo_url, req.style, req.include_badges, req.include_toc)

    # README cache hit
    cached = readme_cache.get(cache_key)
    if cached:
        logger.info(f"README cache HIT for {req.repo_url}")
        return cached

    # Metadata cache hit
    metadata = metadata_cache.get(req.repo_url)
    if metadata:
        logger.info(f"Metadata cache HIT for {req.repo_url}")
    else:
        try:
            metadata = await parse_repo(req.repo_url)
            metadata_cache.set(req.repo_url, metadata)
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            logger.exception(f"GitHub parsing failed for {req.repo_url}")
            raise HTTPException(status_code=502, detail=f"GitHub API error: {e}")

    # Generate
    try:
        result = await generate_readme(
            repo_url=req.repo_url,
            metadata=metadata,
            style=req.style,
            include_badges=req.include_badges,
            include_toc=req.include_toc,
            custom_sections=req.custom_sections,
        )
        
        # Calculate Score
        score_data = score_repository(metadata)
        result.score = score_data["total_score"]
        result.score_breakdown = score_data["score_breakdown"]
        
        # Save payload back to DB
        background_tasks.add_task(save_to_db, req.repo_url, metadata, result.readme_content, score_data)
        
    except Exception as e:
        logger.exception("Claude generation failed")
        raise HTTPException(status_code=500, detail=f"README generation failed: {e}")

    readme_cache.set(cache_key, result)
    return result


# ── Core: Regenerate with feedback ────────────────────────────────────────────
@app.post(
    "/regenerate",
    response_model=GenerateResponse,
    tags=["README"],
    summary="Revise an existing README based on feedback",
)
async def regenerate(req: RegenerateRequest, request: Request, background_tasks: BackgroundTasks):
    """
    Takes your current README + natural-language feedback.
    Returns an improved version without re-parsing the repo.

    Example feedback: "Add a Contributing section and make the installation
    steps more detailed. The description is too vague."
    """
    ip = request.client.host if request.client else "unknown"
    _check_rate_limit(ip)

    # We need metadata — try cache first, parse if miss
    metadata = metadata_cache.get(req.repo_url)
    if not metadata:
        try:
            metadata = await parse_repo(req.repo_url)
            metadata_cache.set(req.repo_url, metadata)
        except ValueError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"GitHub API error: {e}")

    try:
        result = await regenerate_readme(
            repo_url=req.repo_url,
            metadata=metadata,
            current_readme=req.current_readme,
            feedback=req.feedback,
            style=req.style,
            include_badges=req.include_badges,
            include_toc=req.include_toc,
        )
        
        # Calculate Score
        score_data = score_repository(metadata)
        result.score = score_data["total_score"]
        result.score_breakdown = score_data["score_breakdown"]
        
        # Save payload back to DB
        background_tasks.add_task(save_to_db, req.repo_url, metadata, result.readme_content, score_data)
    except Exception as e:
        logger.exception("Claude regeneration failed")
        raise HTTPException(status_code=500, detail=f"Regeneration failed: {e}")

    # Bust old cache entry, store new
    cache_key = readme_cache_key(req.repo_url, req.style, req.include_badges, req.include_toc)
    readme_cache.set(cache_key, result)
    return result


# ── Preview (raw Markdown) ─────────────────────────────────────────────────────
@app.get(
    "/preview",
    tags=["README"],
    summary="Quick preview — returns raw Markdown as plain text",
)
async def preview(repo_url: str, request: Request):
    """
    Lightweight endpoint for live preview panels.
    Always uses standard style. Returns Content-Type: text/plain.
    """
    ip = request.client.host if request.client else "unknown"
    _check_rate_limit(ip)

    cache_key = readme_cache_key(repo_url, "standard", True, True)
    cached = readme_cache.get(cache_key)
    if cached:
        return PlainTextResponse(cached.readme_content)

    try:
        metadata = metadata_cache.get(repo_url) or await parse_repo(repo_url)
        metadata_cache.set(repo_url, metadata)
        result = await generate_readme(repo_url=repo_url, metadata=metadata)
        readme_cache.set(cache_key, result)
        return PlainTextResponse(result.readme_content)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ── Cache management ───────────────────────────────────────────────────────────
@app.get("/cache/stats", tags=["Cache"])
async def cache_stats():
    """Returns current cache sizes and config."""
    return {
        "metadata_cache": metadata_cache.stats(),
        "readme_cache": readme_cache.stats(),
    }


@app.delete("/cache/bust", tags=["Cache"])
async def cache_bust(repo_url: str):
    """Force-invalidate all cached data for a given repo URL."""
    metadata_cache.delete(repo_url)
    for style in ReadmeStyle:
        for badges in (True, False):
            for toc in (True, False):
                readme_cache.delete(readme_cache_key(repo_url, style, badges, toc))
    logger.info(f"Cache busted for {repo_url}")
    return {"busted": repo_url}


@app.delete("/cache/clear", tags=["Cache"])
async def cache_clear():
    """Wipe all caches. Use carefully."""
    metadata_cache.clear()
    readme_cache.clear()
    return {"status": "cleared"}
