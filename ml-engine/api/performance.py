from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from models.ai_models import PerformancePredictor

router = APIRouter()
predictor = PerformancePredictor()

class PerformanceRequest(BaseModel):
    user_id: str
    tasks_completed: int
    achievement_points: int
    collaboration_score: float
    avg_task_completion_time: float
    code_quality_score: float
    peer_ratings: float

class PerformanceResponse(BaseModel):
    predicted_score: float
    confidence: float
    trend: str

@router.post("/predict", response_model=PerformanceResponse)
async def predict_performance(request: PerformanceRequest):
    """Predict future performance based on current metrics"""
    try:
        user_data = request.dict()
        predicted_score = predictor.predict_performance(user_data)
        
        # Calculate confidence based on data completeness
        data_completeness = sum(1 for v in user_data.values() if v > 0) / len(user_data)
        confidence = data_completeness * 100
        
        # Determine trend
        current_avg = (request.tasks_completed * 2 + request.collaboration_score + 
                      request.code_quality_score) / 4
        
        if predicted_score > current_avg:
            trend = "improving"
        elif predicted_score < current_avg:
            trend = "declining"
        else:
            trend = "stable"
        
        return PerformanceResponse(
            predicted_score=predicted_score,
            confidence=confidence,
            trend=trend
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/skills-assessment")
async def assess_skills(user_data: Dict[str, Any]):
    """Assess user skills across different dimensions"""
    try:
        # Mock skills assessment - in production, this would use more sophisticated ML
        skills = {
            "technical": min(100, user_data.get("code_quality_score", 50) + 
                           user_data.get("tasks_completed", 0) * 2),
            "communication": user_data.get("collaboration_score", 50),
            "leadership": min(100, user_data.get("peer_ratings", 50) + 
                            user_data.get("mentoring_score", 0)),
            "problem_solving": min(100, user_data.get("innovation_score", 50) + 
                                 user_data.get("bug_fixes", 0) * 3),
            "collaboration": user_data.get("teamwork_score", 50),
            "innovation": user_data.get("innovation_score", 50)
        }
        
        return {"skills": skills, "overall_score": sum(skills.values()) / len(skills)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skills assessment failed: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "Performance predictor is healthy"}
