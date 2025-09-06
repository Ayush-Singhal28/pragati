from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.models import User, SlackActivity, PerformanceMetric
from app.schemas.schemas import AnalyticsData, CollaborationData

router = APIRouter()

@router.get("/", response_model=AnalyticsData)
async def get_analytics_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get collaboration data from Slack activities
    slack_activities = db.query(SlackActivity).filter(
        SlackActivity.user_id == current_user.id
    ).all()
    
    # Calculate collaboration metrics
    if slack_activities:
        avg_response_time = sum([activity.response_time for activity in slack_activities if activity.response_time]) / len(slack_activities)
        avg_helpfulness = sum([activity.helpfulness_score for activity in slack_activities if activity.helpfulness_score]) / len(slack_activities)
        avg_sentiment = sum([activity.sentiment_score for activity in slack_activities if activity.sentiment_score]) / len(slack_activities)
    else:
        avg_response_time = 92.0
        avg_helpfulness = 88.0
        avg_sentiment = 95.0
    
    collaboration_data = CollaborationData(
        response_time=avg_response_time,
        helpfulness=avg_helpfulness,
        communication=avg_sentiment,
        teamwork=90.0  # Mock data for now
    )
    
    # Mock strengths and improvement areas (in production, these would be ML-generated)
    strengths = [
        "Code Quality & Best Practices",
        "Problem-Solving Skills",
        "Technical Documentation",
        "Team Collaboration",
        "Meeting Deadlines"
    ]
    
    improvement_areas = [
        "Public Speaking & Presentations",
        "Project Management Skills",
        "Mentoring Junior Developers",
        "Cross-team Communication"
    ]
    
    # AI-generated recommendations (mock data)
    recommendations = [
        {
            "title": "Consider Leadership Training",
            "description": "Your collaboration scores suggest leadership potential. Consider enrolling in leadership development programs.",
            "priority": "high"
        },
        {
            "title": "Expand Technical Skills",
            "description": "Explore cloud technologies and DevOps practices to enhance your technical profile.",
            "priority": "medium"
        },
        {
            "title": "Presentation Skills Workshop",
            "description": "Improving presentation skills would complement your strong technical abilities.",
            "priority": "low"
        }
    ]
    
    return AnalyticsData(
        collaboration_data=collaboration_data,
        strengths=strengths,
        improvement_areas=improvement_areas,
        recommendations=recommendations
    )

@router.get("/performance-trends")
async def get_performance_trends(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get performance metrics from database
    metrics = db.query(PerformanceMetric).filter(
        PerformanceMetric.user_id == current_user.id
    ).order_by(PerformanceMetric.period_start.desc()).limit(6).all()
    
    # Mock data for demonstration
    if not metrics:
        return [
            {"month": "Jan", "performance": 85, "collaboration": 80, "innovation": 75},
            {"month": "Feb", "performance": 87, "collaboration": 82, "innovation": 78},
            {"month": "Mar", "performance": 89, "collaboration": 85, "innovation": 80},
            {"month": "Apr", "performance": 92, "collaboration": 88, "innovation": 85},
            {"month": "May", "performance": 95, "collaboration": 90, "innovation": 88},
            {"month": "Jun", "performance": 98, "collaboration": 92, "innovation": 90},
        ]
    
    return metrics
