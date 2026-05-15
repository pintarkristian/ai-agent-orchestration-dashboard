from fastapi import FastAPI

from app.api.router import api_router
from app.core.config import get_settings


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Backend API skeleton for the AI Agent Orchestration Dashboard.",
    )
    app.include_router(api_router)

    return app


app = create_app()
