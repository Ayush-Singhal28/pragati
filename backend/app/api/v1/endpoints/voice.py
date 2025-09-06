from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from app.services.elevenlabs_service import elevenlabs_service
from app.api.v1.endpoints.auth import get_current_user
from app.models.models import User
from pydantic import BaseModel
from typing import Optional
import io

router = APIRouter()

class TTSRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None

class AchievementNotificationRequest(BaseModel):
    achievement_title: str
    points: int

@router.post("/text-to-speech")
async def text_to_speech(
    request: TTSRequest,
    current_user: User = Depends(get_current_user)
):
    """Convert text to speech"""
    try:
        audio_content = await elevenlabs_service.text_to_speech(
            request.text, 
            request.voice_id
        )
        
        return StreamingResponse(
            io.BytesIO(audio_content),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=speech.mp3"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/achievement-notification")
async def achievement_notification(
    request: AchievementNotificationRequest,
    current_user: User = Depends(get_current_user)
):
    """Generate voice notification for achievement"""
    try:
        audio_content = await elevenlabs_service.generate_achievement_notification(
            request.achievement_title,
            request.points
        )
        
        return StreamingResponse(
            io.BytesIO(audio_content),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=achievement.mp3"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/performance-summary")
async def performance_summary(
    current_user: User = Depends(get_current_user)
):
    """Generate voice summary of performance metrics"""
    try:
        # Mock performance data - in production, fetch from database
        performance_data = {
            "performance_score": 95,
            "tasks_completed": 24,
            "achievement_points": 1250,
            "collaboration_score": 91
        }
        
        audio_content = await elevenlabs_service.generate_performance_summary(performance_data)
        
        return StreamingResponse(
            io.BytesIO(audio_content),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=performance_summary.mp3"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
