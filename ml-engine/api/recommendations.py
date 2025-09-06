from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from models.ai_models import RecommendationEngine

router = APIRouter()
engine = RecommendationEngine()

class RecommendationRequest(BaseModel):
    user_profile: Dict[str, Any]
    performance_data: Dict[str, Any]

class Recommendation(BaseModel):
    title: str
    description: str
    priority: str
    category: str

class RecommendationResponse(BaseModel):
    recommendations: List[Recommendation]
    strengths: List[str]
    improvement_areas: List[str]

@router.post("/generate", response_model=RecommendationResponse)
async def generate_recommendations(request: RecommendationRequest):
    """Generate personalized recommendations for career growth"""
    try:
        recommendations = engine.generate_recommendations(
            request.user_profile, 
            request.performance_data
        )
        
        strengths_and_areas = engine.identify_strengths_and_areas(request.performance_data)
        
        return RecommendationResponse(
            recommendations=[Recommendation(**rec) for rec in recommendations],
            strengths=strengths_and_areas['strengths'],
            improvement_areas=strengths_and_areas['improvement_areas']
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation generation failed: {str(e)}")

@router.post("/career-path")
async def suggest_career_path(user_profile: Dict[str, Any]):
    """Suggest career progression paths"""
    try:
        current_role = user_profile.get('role', '').lower()
        skills = user_profile.get('skills', {})
        experience = user_profile.get('years_experience', 0)
        
        # Simple career path suggestions based on current role and skills
        career_paths = []
        
        if 'developer' in current_role:
            if skills.get('leadership', 0) > 70:
                career_paths.append({
                    'title': 'Engineering Manager',
                    'requirements': ['Leadership training', 'Project management skills'],
                    'timeline': '1-2 years'
                })
            
            if skills.get('technical', 0) > 85:
                career_paths.append({
                    'title': 'Senior/Principal Engineer',
                    'requirements': ['Advanced technical skills', 'System design'],
                    'timeline': '6 months - 1 year'
                })
        
        if skills.get('innovation', 0) > 75:
            career_paths.append({
                'title': 'Technical Lead/Architect',
                'requirements': ['System architecture', 'Technical mentoring'],
                'timeline': '1-3 years'
            })
        
        return {"career_paths": career_paths}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Career path suggestion failed: {str(e)}")

@router.post("/learning-recommendations")
async def suggest_learning_paths(user_profile: Dict[str, Any]):
    """Recommend learning resources based on skill gaps"""
    try:
        skills = user_profile.get('skills', {})
        role = user_profile.get('role', '').lower()
        
        learning_recommendations = []
        
        # Technical skills
        if skills.get('technical', 0) < 70:
            learning_recommendations.append({
                'category': 'Technical Skills',
                'resources': [
                    'Advanced programming courses',
                    'System design fundamentals',
                    'Code review best practices'
                ],
                'priority': 'high'
            })
        
        # Communication skills
        if skills.get('communication', 0) < 60:
            learning_recommendations.append({
                'category': 'Communication',
                'resources': [
                    'Technical writing workshop',
                    'Presentation skills course',
                    'Active listening training'
                ],
                'priority': 'medium'
            })
        
        # Leadership skills
        if skills.get('leadership', 0) < 50 and 'senior' in role:
            learning_recommendations.append({
                'category': 'Leadership',
                'resources': [
                    'Leadership fundamentals',
                    'Mentoring best practices',
                    'Team management course'
                ],
                'priority': 'medium'
            })
        
        return {"learning_recommendations": learning_recommendations}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Learning recommendation failed: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "Recommendation engine is healthy"}
