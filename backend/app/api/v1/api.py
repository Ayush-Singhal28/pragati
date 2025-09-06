from fastapi import APIRouter
from app.api.v1.endpoints import auth, dashboard, achievements, analytics, users, tasks, voice, enterprise_auth

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(achievements.router, prefix="/achievements", tags=["achievements"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice"])
api_router.include_router(enterprise_auth.router, prefix="/enterprise", tags=["enterprise"])
