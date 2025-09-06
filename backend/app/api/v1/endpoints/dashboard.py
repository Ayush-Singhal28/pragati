from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.models import User, Task, Achievement
from app.schemas.schemas import DashboardData, Task as TaskSchema, Achievement as AchievementSchema
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/", response_model=DashboardData)
async def get_dashboard_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get recent tasks (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_tasks = db.query(Task).filter(
        Task.assignee_id == current_user.id,
        Task.created_at >= thirty_days_ago
    ).limit(5).all()
    
    # Get recent achievements (last 30 days)
    recent_achievements = db.query(Achievement).filter(
        Achievement.user_id == current_user.id,
        Achievement.earned_at >= thirty_days_ago
    ).limit(5).all()
    
    # Calculate metrics
    completed_tasks = db.query(Task).filter(
        Task.assignee_id == current_user.id,
        Task.status == "completed",
        Task.completed_at >= thirty_days_ago
    ).count()
    
    total_points = sum([achievement.points for achievement in 
                       db.query(Achievement).filter(Achievement.user_id == current_user.id).all()])
    
    # Mock performance and collaboration scores for now
    performance_score = 98
    collaboration_score = 91
    
    return DashboardData(
        performance_score=performance_score,
        tasks_completed=completed_tasks,
        achievement_points=total_points,
        collaboration_score=collaboration_score,
        recent_tasks=recent_tasks,
        recent_achievements=recent_achievements
    )
