from __future__ import annotations

import httpx

from app.core.config import get_settings


class OpenRouterClient:
    """Async HTTP client wrapper prepared for future OpenRouter API calls."""

    def __init__(self, api_key: str | None = None, base_url: str | None = None) -> None:
        settings = get_settings()
        self.api_key = api_key or settings.openrouter_api_key
        self.base_url = (base_url or settings.openrouter_base_url).rstrip("/")

    def build_headers(self) -> dict[str, str]:
        """Build default headers for OpenRouter requests without sending a request yet."""
        headers = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
        return headers

    def create_async_client(self) -> httpx.AsyncClient:
        """Create an async HTTP client for future OpenRouter service methods."""
        return httpx.AsyncClient(
            base_url=self.base_url,
            headers=self.build_headers(),
            timeout=60.0,
        )
