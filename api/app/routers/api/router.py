from fastapi.routing import APIRouter

from app.routers.api import echo, monitoring, users

api_router = APIRouter()

api_router.include_router(monitoring.router)
api_router.include_router(users.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
