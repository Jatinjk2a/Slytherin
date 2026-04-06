import httpx
import base64
import asyncio
from typing import Optional
from models.schemas import RepoMetadata
from config import settings
import logging

logger = logging.getLogger(__name__)

# Files that carry high signal for README generation
KEY_FILES = {
    "package.json", "pyproject.toml", "setup.py", "setup.cfg",
    "Cargo.toml", "go.mod", "pom.xml", "build.gradle",
    "requirements.txt", "Pipfile", "poetry.lock",
    "Makefile", "docker-compose.yml", "Dockerfile",
    ".github/workflows/ci.yml", ".github/workflows/main.yml",
    "contributing.md", "CONTRIBUTING.md",
}

CI_INDICATORS = {
    ".travis.yml", ".circleci", ".github/workflows",
    "Jenkinsfile", ".gitlab-ci.yml", "azure-pipelines.yml"
}

TEST_INDICATORS = {
    "test", "tests", "spec", "__tests__", "test_", "_test",
    "pytest", "jest", "mocha", "rspec"
}


def _build_headers(token: Optional[str]) -> dict:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def _parse_owner_repo(repo_url: str) -> tuple[str, str]:
    """Extract owner and repo name from GitHub URL."""
    clean = repo_url.replace("https://github.com/", "").replace("http://github.com/", "")
    parts = clean.split("/")
    return parts[0], parts[1]


async def _fetch_json(client: httpx.AsyncClient, url: str) -> dict | list | None:
    try:
        resp = await client.get(url)
        if resp.status_code == 200:
            return resp.json()
        logger.warning(f"GitHub API {url} returned {resp.status_code}")
        return None
    except Exception as e:
        logger.error(f"Error fetching {url}: {e}")
        return None


async def _fetch_file_content(
    client: httpx.AsyncClient,
    owner: str,
    repo: str,
    path: str,
    max_kb: int = 100
) -> Optional[str]:
    """Fetch decoded file content from GitHub, capped at max_kb."""
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
    data = await _fetch_json(client, url)
    if not data or not isinstance(data, dict):
        return None
    size_kb = data.get("size", 0) / 1024
    if size_kb > max_kb:
        return f"[File too large to display: {size_kb:.1f} KB]"
    if data.get("encoding") == "base64" and data.get("content"):
        try:
            raw = base64.b64decode(data["content"].replace("\n", "")).decode("utf-8", errors="replace")
            # Truncate to ~3000 chars for prompt efficiency
            return raw[:3000] + ("\n...[truncated]" if len(raw) > 3000 else "")
        except Exception:
            return None
    return None


async def _get_file_tree(
    client: httpx.AsyncClient,
    owner: str,
    repo: str,
    branch: str,
    max_files: int = 200
) -> list[str]:
    """Recursively get file tree via Git Trees API."""
    url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
    data = await _fetch_json(client, url)
    if not data or not isinstance(data, dict):
        return []
    tree = data.get("tree", [])
    paths = [
        item["path"] for item in tree
        if item.get("type") == "blob"
    ]
    return paths[:max_files]


def _detect_has_tests(file_tree: list[str]) -> bool:
    for path in file_tree:
        lower = path.lower()
        if any(ind in lower for ind in TEST_INDICATORS):
            return True
    return False


def _detect_has_ci(file_tree: list[str]) -> bool:
    for path in file_tree:
        lower = path.lower()
        if any(ind in lower for ind in CI_INDICATORS):
            return True
    return False


async def parse_repo(repo_url: str) -> RepoMetadata:
    """
    Main entrypoint. Fetches all metadata needed for README generation.
    """
    owner, repo_name = _parse_owner_repo(repo_url)
    headers = _build_headers(settings.github_token)
    base = f"https://api.github.com/repos/{owner}/{repo_name}"

    async with httpx.AsyncClient(headers=headers, timeout=30.0) as client:
        # Fire off repo info + languages in parallel
        repo_task = asyncio.create_task(_fetch_json(client, base))
        langs_task = asyncio.create_task(_fetch_json(client, f"{base}/languages"))
        topics_task = asyncio.create_task(_fetch_json(client, f"{base}/topics"))

        repo_data, langs_data, topics_data = await asyncio.gather(
            repo_task, langs_task, topics_task
        )

        if not repo_data or not isinstance(repo_data, dict):
            raise ValueError(f"Repository not found or inaccessible: {repo_url}")

        default_branch = repo_data.get("default_branch", "main")

        # Get file tree
        file_tree = await _get_file_tree(
            client, owner, repo_name, default_branch,
            max_files=settings.max_files_to_parse
        )

        # Identify key files that exist in the repo
        tree_set = set(file_tree)
        files_to_fetch = [f for f in KEY_FILES if f in tree_set]

        # Also grab any top-level README that might exist (for context, not for output)
        readme_candidates = [p for p in file_tree if p.lower() in {"readme.md", "readme.rst", "readme.txt"}]
        if readme_candidates:
            files_to_fetch.append(readme_candidates[0])

        # Fetch all key file contents concurrently
        fetch_tasks = {
            fname: asyncio.create_task(
                _fetch_file_content(client, owner, repo_name, fname, settings.max_file_size_kb)
            )
            for fname in files_to_fetch
        }
        fetched = {fname: await task for fname, task in fetch_tasks.items()}
        key_files = {k: v for k, v in fetched.items() if v}

        # Parse license
        license_info = repo_data.get("license")
        license_name = license_info.get("spdx_id") if license_info else None

        # Topics
        topics = []
        if isinstance(topics_data, dict):
            topics = topics_data.get("names", [])

        return RepoMetadata(
            owner=owner,
            name=repo_name,
            full_name=repo_data.get("full_name", f"{owner}/{repo_name}"),
            description=repo_data.get("description"),
            language=repo_data.get("language"),
            languages=langs_data if isinstance(langs_data, dict) else {},
            stars=repo_data.get("stargazers_count", 0),
            forks=repo_data.get("forks_count", 0),
            open_issues=repo_data.get("open_issues_count", 0),
            topics=topics,
            license=license_name,
            default_branch=default_branch,
            homepage=repo_data.get("homepage") or None,
            has_tests=_detect_has_tests(file_tree),
            has_ci=_detect_has_ci(file_tree),
            file_tree=file_tree,
            key_files=key_files,
        )
