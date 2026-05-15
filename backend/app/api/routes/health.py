from fastapi import APIRouter

from app.core.config import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Return API health and runtime metadata."""
    settings = get_settings()

    return {
        "status": "ok",
        "version": settings.app_version,
        "environment": settings.environment,
    }
