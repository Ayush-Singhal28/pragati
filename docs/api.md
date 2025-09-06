# API Documentation

## Overview

The Pragati API provides endpoints for performance tracking, achievements, analytics, and user management.

## Base URL

```
http://localhost:8000/api/v1
```

## Authentication

All API endpoints (except `/auth/login` and `/auth/register`) require authentication using Bearer tokens.

### Login
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=demo@pragati.com&password=demo123
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer"
}
```

## Endpoints

### Authentication

#### Login
- **POST** `/auth/login`
- **POST** `/auth/register`
- **GET** `/auth/me`

### Dashboard

#### Get Dashboard Data
- **GET** `/dashboard/`

Returns:
```json
{
  "performance_score": 98,
  "tasks_completed": 24,
  "achievement_points": 1250,
  "collaboration_score": 91,
  "recent_tasks": [...],
  "recent_achievements": [...]
}
```

### Tasks

#### List Tasks
- **GET** `/tasks/`
- **POST** `/tasks/`
- **GET** `/tasks/{task_id}`
- **PUT** `/tasks/{task_id}`
- **DELETE** `/tasks/{task_id}`

### Achievements

#### List Achievements
- **GET** `/achievements/`
- **POST** `/achievements/`
- **GET** `/achievements/stats`

### Analytics

#### Get Analytics Data
- **GET** `/analytics/`
- **GET** `/analytics/performance-trends`

### Users

#### User Management
- **GET** `/users/me`
- **PUT** `/users/me`
- **GET** `/users/`

## Error Responses

The API returns standard HTTP status codes and error messages in JSON format:

```json
{
  "detail": "Error message"
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per user.

## ML Engine API

The ML Engine provides AI/ML capabilities at `http://localhost:8001`

### Collaboration Analysis
- **POST** `/collaboration/analyze`
- **POST** `/collaboration/sentiment`

### Performance Prediction
- **POST** `/performance/predict`
- **POST** `/performance/skills-assessment`

### Recommendations
- **POST** `/recommendations/generate`
- **POST** `/recommendations/career-path`
- **POST** `/recommendations/learning-recommendations`
