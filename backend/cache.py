"""
Simple in-memory TTL cache.
Keyed by (repo_url, style, include_badges, include_toc).
Avoids hammering GitHub API + Claude for the same repo within TTL window.
"""
import time
from collections import OrderedDict
from typing import Any, Optional
import logging

logger = logging.getLogger(__name__)

_DEFAULT_TTL = 60 * 30        # 30 minutes
_MAX_ENTRIES  = 200


class TTLCache:
    def __init__(self, ttl: int = _DEFAULT_TTL, max_size: int = _MAX_ENTRIES):
        self._store: OrderedDict[str, tuple[Any, float]] = OrderedDict()
        self.ttl = ttl
        self.max_size = max_size

    def _evict_expired(self):
        now = time.monotonic()
        expired = [k for k, (_, exp) in self._store.items() if now > exp]
        for k in expired:
            del self._store[k]

    def get(self, key: str) -> Optional[Any]:
        self._evict_expired()
        entry = self._store.get(key)
        if entry is None:
            return None
        value, exp = entry
        if time.monotonic() > exp:
            del self._store[key]
            return None
        # Move to end (LRU)
        self._store.move_to_end(key)
        return value

    def set(self, key: str, value: Any):
        self._evict_expired()
        if key in self._store:
            self._store.move_to_end(key)
        elif len(self._store) >= self.max_size:
            # Evict oldest
            evicted_key = next(iter(self._store))
            del self._store[evicted_key]
            logger.debug(f"Cache full — evicted {evicted_key}")
        self._store[key] = (value, time.monotonic() + self.ttl)

    def delete(self, key: str):
        self._store.pop(key, None)

    def clear(self):
        self._store.clear()

    @property
    def size(self) -> int:
        self._evict_expired()
        return len(self._store)

    def stats(self) -> dict:
        self._evict_expired()
        return {"entries": len(self._store), "ttl_seconds": self.ttl, "max_size": self.max_size}


# Singletons — import these directly
metadata_cache = TTLCache(ttl=60 * 15)   # repo metadata: 15 min
readme_cache   = TTLCache(ttl=60 * 30)   # generated readmes: 30 min


def readme_cache_key(repo_url: str, style: str, badges: bool, toc: bool) -> str:
    style_val = style.value if hasattr(style, "value") else style
    return f"{repo_url}|{style_val}|{int(badges)}|{int(toc)}"
