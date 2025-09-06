from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.models import User, Achievement
from app.schemas.schemas import Achievement as AchievementSchema, AchievementCreate

router = APIRouter()

@router.get("/", response_model=List[AchievementSchema])
async def get_achievements(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    achievements = db.query(Achievement).filter(
        Achievement.user_id == current_user.id
    ).order_by(Achievement.earned_at.desc()).all()
    
    return achievements

@router.post("/", response_model=AchievementSchema)
async def create_achievement(
    achievement_data: AchievementCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    achievement = Achievement(**achievement_data.dict())
    db.add(achievement)
    db.commit()
    db.refresh(achievement)
    return achievement

@router.get("/stats")
async def get_achievement_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    achievements = db.query(Achievement).filter(
        Achievement.user_id == current_user.id
    ).all()
    
    total_points = sum([achievement.points for achievement in achievements])
    
    # Category breakdown
    categories = {}
    for achievement in achievements:
        if achievement.category not in categories:
            categories[achievement.category] = {"count": 0, "points": 0}
        categories[achievement.category]["count"] += 1
        categories[achievement.category]["points"] += achievement.points
    
    # Level breakdown
    levels = {}
    for achievement in achievements:
        if achievement.level not in levels:
            levels[achievement.level] = 0
        levels[achievement.level] += 1
    
    return {
        "total_achievements": len(achievements),
        "total_points": total_points,
        "categories": categories,
        "levels": levels
    }
