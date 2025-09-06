# ElevenLabs Integration for Pragati
# Voice notifications and accessibility features

import os
import requests
from typing import Optional
import asyncio
from fastapi import HTTPException

class ElevenLabsService:
    """Service for text-to-speech notifications and accessibility"""
    
    def __init__(self):
        self.api_key = os.getenv("ELEVENLABS_API_KEY")
        self.base_url = "https://api.elevenlabs.io/v1"
        self.voice_id = "21m00Tcm4TlvDq8ikWAM"  # Default voice
        
    async def text_to_speech(self, text: str, voice_id: Optional[str] = None) -> bytes:
        """Convert text to speech using ElevenLabs"""
        if not self.api_key:
            raise HTTPException(status_code=500, detail="ElevenLabs API key not configured")
        
        url = f"{self.base_url}/text-to-speech/{voice_id or self.voice_id}"
        
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": self.api_key
        }
        
        data = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.5
            }
        }
        
        response = requests.post(url, json=data, headers=headers)
        
        if response.status_code == 200:
            return response.content
        else:
            raise HTTPException(status_code=response.status_code, detail="TTS generation failed")
    
    async def generate_achievement_notification(self, achievement_title: str, points: int) -> bytes:
        """Generate voice notification for new achievements"""
        text = f"Congratulations! You've earned the {achievement_title} achievement for {points} points. Keep up the great work!"
        return await self.text_to_speech(text)
    
    async def generate_performance_summary(self, performance_data: dict) -> bytes:
        """Generate voice summary of performance metrics"""
        score = performance_data.get('performance_score', 0)
        tasks = performance_data.get('tasks_completed', 0)
        
        text = f"Your current performance score is {score} out of 100. You've completed {tasks} tasks this month. "
        
        if score >= 90:
            text += "Excellent work! You're performing at the highest level."
        elif score >= 75:
            text += "Great job! You're doing very well."
        elif score >= 60:
            text += "Good progress! Keep working towards your goals."
        else:
            text += "There's room for improvement. Consider focusing on your development areas."
        
        return await self.text_to_speech(text)

# API endpoint for voice features
elevenlabs_service = ElevenLabsService()
