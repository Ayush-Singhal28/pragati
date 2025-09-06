from typing import List, Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    department: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Task schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    deadline: Optional[datetime] = None

class TaskCreate(TaskBase):
    assignee_id: int

class TaskUpdate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    assignee_id: int
    created_by: int
    completed_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Achievement schemas
class AchievementBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    level: str
    points: int

class AchievementCreate(AchievementBase):
    user_id: int

class Achievement(AchievementBase):
    id: int
    user_id: int
    earned_at: datetime
    
    class Config:
        from_attributes = True

# Performance schemas
class PerformanceMetricBase(BaseModel):
    metric_name: str
    metric_value: float
    period_start: datetime
    period_end: datetime

class PerformanceMetric(PerformanceMetricBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Dashboard schemas
class DashboardData(BaseModel):
    performance_score: int
    tasks_completed: int
    achievement_points: int
    collaboration_score: int
    recent_tasks: List[Task]
    recent_achievements: List[Achievement]

# Analytics schemas
class CollaborationData(BaseModel):
    response_time: float
    helpfulness: float
    communication: float
    teamwork: float

class AnalyticsData(BaseModel):
    collaboration_data: CollaborationData
    strengths: List[str]
    improvement_areas: List[str]
    recommendations: List[dict]
