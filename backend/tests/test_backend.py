"""
Tests for ReadmeAI backend.

Run:
    pip install pytest pytest-asyncio httpx --break-system-packages
    XAI_API_KEY=dummy pytest tests/ -v
"""
import pytest
import pytest_asyncio
from unittest.mock import AsyncMock, MagicMock, patch
from fastapi.testclient import TestClient
import sys
import os

# Make sure imports resolve
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

os.environ.setdefault("XAI_API_KEY", "dummy")

from models.schemas import (
    GenerateRequest, ReadmeStyle, RepoMetadata, RegenerateRequest
)
from cache import TTLCache, readme_cache_key
import time


# ── Fixtures ──────────────────────────────────────────────────────────────────

def _make_metadata(**overrides) -> RepoMetadata:
    base = dict(
        owner="tiangolo",
        name="fastapi",
        full_name="tiangolo/fastapi",
        description="FastAPI framework",
        language="Python",
        languages={"Python": 90000, "HTML": 5000},
        stars=70000,
        forks=5900,
        open_issues=200,
        topics=["python", "api", "fastapi"],
        license="MIT",
        default_branch="main",
        homepage="https://fastapi.tiangolo.com",
        has_tests=True,
        has_ci=True,
        file_tree=["main.py", "tests/test_main.py", ".github/workflows/ci.yml"],
        key_files={"requirements.txt": "fastapi\nuvicorn\n"},
    )
    base.update(overrides)
    return RepoMetadata(**base)


# ── Schema tests ──────────────────────────────────────────────────────────────

class TestGenerateRequest:
    def test_valid_url(self):
        r = GenerateRequest(repo_url="https://github.com/tiangolo/fastapi")
        assert r.repo_url == "https://github.com/tiangolo/fastapi"

    def test_trailing_slash_stripped(self):
        r = GenerateRequest(repo_url="https://github.com/tiangolo/fastapi/")
        assert not r.repo_url.endswith("/")

    def test_non_github_rejected(self):
        with pytest.raises(Exception, match="GitHub"):
            GenerateRequest(repo_url="https://gitlab.com/foo/bar")

    def test_no_repo_path_rejected(self):
        with pytest.raises(Exception):
            GenerateRequest(repo_url="https://github.com/onlyowner")

    def test_default_style_is_standard(self):
        r = GenerateRequest(repo_url="https://github.com/a/b")
        assert r.style == ReadmeStyle.standard

    def test_custom_sections(self):
        r = GenerateRequest(
            repo_url="https://github.com/a/b",
            custom_sections=["Benchmarks", "Migration"]
        )
        assert "Benchmarks" in r.custom_sections

    def test_badges_and_toc_default_true(self):
        r = GenerateRequest(repo_url="https://github.com/a/b")
        assert r.include_badges is True
        assert r.include_toc is True


# ── Cache tests ───────────────────────────────────────────────────────────────

class TestTTLCache:
    def test_set_and_get(self):
        c = TTLCache(ttl=10)
        c.set("key1", "value1")
        assert c.get("key1") == "value1"

    def test_miss_returns_none(self):
        c = TTLCache(ttl=10)
        assert c.get("nonexistent") is None

    def test_ttl_expiry(self):
        c = TTLCache(ttl=1)
        c.set("k", "v")
        assert c.get("k") == "v"
        # Manually expire it
        c._store["k"] = (c._store["k"][0], time.monotonic() - 1)
        assert c.get("k") is None

    def test_max_size_eviction(self):
        c = TTLCache(ttl=60, max_size=3)
        c.set("a", 1)
        c.set("b", 2)
        c.set("c", 3)
        assert c.size == 3
        c.set("d", 4)           # should evict "a"
        assert c.size == 3
        assert c.get("a") is None
        assert c.get("d") == 4

    def test_delete(self):
        c = TTLCache(ttl=60)
        c.set("x", 99)
        c.delete("x")
        assert c.get("x") is None

    def test_clear(self):
        c = TTLCache(ttl=60)
        for i in range(5):
            c.set(str(i), i)
        c.clear()
        assert c.size == 0

    def test_stats(self):
        c = TTLCache(ttl=42, max_size=100)
        c.set("k", "v")
        s = c.stats()
        assert s["entries"] == 1
        assert s["ttl_seconds"] == 42


class TestCacheKey:
    def test_key_is_deterministic(self):
        k1 = readme_cache_key("https://github.com/a/b", "standard", True, True)
        k2 = readme_cache_key("https://github.com/a/b", "standard", True, True)
        assert k1 == k2

    def test_different_styles_produce_different_keys(self):
        k1 = readme_cache_key("https://github.com/a/b", "minimal", True, True)
        k2 = readme_cache_key("https://github.com/a/b", "detailed", True, True)
        assert k1 != k2


# ── GitHub Parser unit tests ──────────────────────────────────────────────────

class TestGithubParserHelpers:
    def test_parse_owner_repo(self):
        from services.github_parser import _parse_owner_repo
        owner, repo = _parse_owner_repo("https://github.com/tiangolo/fastapi")
        assert owner == "tiangolo"
        assert repo == "fastapi"

    def test_parse_owner_repo_trailing_slash(self):
        from services.github_parser import _parse_owner_repo
        owner, repo = _parse_owner_repo("https://github.com/owner/repo/")
        # After strip in GenerateRequest, slash is already gone;
        # but parser should handle it anyway
        assert owner == "owner"

    def test_detect_has_tests_positive(self):
        from services.github_parser import _detect_has_tests
        assert _detect_has_tests(["tests/test_main.py", "src/app.py"])

    def test_detect_has_tests_negative(self):
        from services.github_parser import _detect_has_tests
        assert not _detect_has_tests(["src/app.py", "README.md"])

    def test_detect_has_ci_github_actions(self):
        from services.github_parser import _detect_has_ci
        assert _detect_has_ci([".github/workflows/ci.yml"])

    def test_detect_has_ci_travis(self):
        from services.github_parser import _detect_has_ci
        assert _detect_has_ci([".travis.yml"])

    def test_detect_has_ci_negative(self):
        from services.github_parser import _detect_has_ci
        assert not _detect_has_ci(["src/main.py", "README.md"])

    def test_build_headers_with_token(self):
        from services.github_parser import _build_headers
        h = _build_headers("mytoken")
        assert "Authorization" in h
        assert "Bearer mytoken" in h["Authorization"]

    def test_build_headers_without_token(self):
        from services.github_parser import _build_headers
        h = _build_headers("")
        assert "Authorization" not in h


# ── FastAPI route tests (mocked) ──────────────────────────────────────────────

@pytest.fixture
def mock_metadata():
    return _make_metadata()


@pytest.fixture
def mock_generate_response(mock_metadata):
    from models.schemas import GenerateResponse
    return GenerateResponse(
        repo_url="https://github.com/tiangolo/fastapi",
        readme_content="# FastAPI\n\nFast API framework.\n",
        metadata=mock_metadata,
        tokens_used=1500,
    )


@pytest.fixture
def client(mock_metadata, mock_generate_response):
    """TestClient with GitHub parser and Claude both mocked."""
    with patch("services.github_parser.parse_repo", new=AsyncMock(return_value=mock_metadata)), \
         patch("services.readme_generator.generate_readme", new=AsyncMock(return_value=mock_generate_response)):
        from main import app
        # Clear caches between test runs
        from cache import metadata_cache, readme_cache
        metadata_cache.clear()
        readme_cache.clear()
        yield TestClient(app)


class TestRoutes:
    def test_root(self, client):
        r = client.get("/")
        assert r.status_code == 200
        assert r.json()["service"] == "ReadmeAI"

    def test_health(self, client):
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json()["status"] == "ok"

    def test_generate_success(self, client):
        r = client.post("/generate", json={"repo_url": "https://github.com/tiangolo/fastapi"})
        assert r.status_code == 200
        body = r.json()
        assert "readme_content" in body
        assert "# FastAPI" in body["readme_content"]
        assert body["tokens_used"] == 1500

    def test_generate_invalid_url(self, client):
        r = client.post("/generate", json={"repo_url": "https://gitlab.com/foo/bar"})
        assert r.status_code == 422

    def test_generate_cached_on_second_call(self, mock_generate_response):
        """Second identical request should be served from cache - no GitHub or Claude calls."""
        import main as app_module
        from cache import readme_cache_key as rck

        app_module.metadata_cache.clear()
        app_module.readme_cache.clear()

        key = rck("https://github.com/tiangolo/fastapi", "standard", True, True)
        app_module.readme_cache.set(key, mock_generate_response)

        with patch("main.parse_repo", new=AsyncMock()) as mock_parse,              patch("main.generate_readme", new=AsyncMock()) as mock_gen:
            from main import app
            from fastapi.testclient import TestClient as TC2
            tc2 = TC2(app)
            r = tc2.post("/generate", json={"repo_url": "https://github.com/tiangolo/fastapi"})
            assert r.status_code == 200
            assert "FastAPI" in r.json()["readme_content"]
            mock_parse.assert_not_called()
            mock_gen.assert_not_called()

    def test_cache_stats(self, client):
        r = client.get("/cache/stats")
        assert r.status_code == 200
        body = r.json()
        assert "metadata_cache" in body
        assert "readme_cache" in body

    def test_cache_bust(self, client):
        r = client.delete("/cache/bust?repo_url=https://github.com/tiangolo/fastapi")
        assert r.status_code == 200
        assert "busted" in r.json()

    def test_cache_clear(self, client):
        r = client.delete("/cache/clear")
        assert r.status_code == 200

    def test_process_time_header(self, client):
        r = client.get("/health")
        assert "X-Process-Time-Ms" in r.headers

    def test_generate_all_styles(self, client):
        for style in ("minimal", "standard", "detailed"):
            r = client.post("/generate", json={
                "repo_url": "https://github.com/tiangolo/fastapi",
                "style": style,
            })
            assert r.status_code == 200

    def test_generate_custom_sections(self, client):
        r = client.post("/generate", json={
            "repo_url": "https://github.com/tiangolo/fastapi",
            "custom_sections": ["Benchmarks", "Migration Guide"],
        })
        assert r.status_code == 200
