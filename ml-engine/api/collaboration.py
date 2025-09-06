from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from models.ai_models import CollaborationAnalyzer

router = APIRouter()
analyzer = CollaborationAnalyzer()

class SlackMessage(BaseModel):
    message_text: str
    response_time: float
    channel_id: str
    timestamp: str

class CollaborationRequest(BaseModel):
    user_id: str
    slack_activities: List[Dict[str, Any]]

class CollaborationResponse(BaseModel):
    response_time: float
    helpfulness: float
    communication: float
    teamwork: float

@router.post("/analyze", response_model=CollaborationResponse)
async def analyze_collaboration(request: CollaborationRequest):
    """Analyze collaboration patterns from Slack activities"""
    try:
        features = analyzer.extract_features(request.slack_activities)
        scores = analyzer.calculate_collaboration_score(features)
        
        return CollaborationResponse(**scores)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/sentiment")
async def analyze_sentiment(message: SlackMessage):
    """Analyze sentiment of a single message"""
    try:
        sentiment_score = analyzer.analyze_message_sentiment(message.message_text)
        
        return {
            "message": message.message_text,
            "sentiment_score": sentiment_score,
            "sentiment_label": "positive" if sentiment_score > 0.1 else "negative" if sentiment_score < -0.1 else "neutral"
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sentiment analysis failed: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "Collaboration analyzer is healthy"}
