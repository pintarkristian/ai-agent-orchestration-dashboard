from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Minimal health endpoint for local development and deployment checks."""
    return {"status": "ok"}
