# Scalekit Enterprise Authentication Integration
# Enterprise-grade authentication and authorization for Pragati

import os
from typing import Optional, Dict, Any
import httpx
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

class ScalekitAuth:
    """Scalekit enterprise authentication integration"""
    
    def __init__(self):
        self.client_id = os.getenv("SCALEKIT_CLIENT_ID")
        self.client_secret = os.getenv("SCALEKIT_CLIENT_SECRET")
        self.base_url = os.getenv("SCALEKIT_BASE_URL", "https://api.scalekit.com")
        self.domain = os.getenv("SCALEKIT_DOMAIN")
        
    async def validate_token(self, token: str) -> Dict[str, Any]:
        """Validate JWT token with Scalekit"""
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
            
            response = await client.get(
                f"{self.base_url}/api/v1/validate",
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(
                    status_code=401, 
                    detail="Invalid authentication token"
                )
    
    async def get_user_info(self, user_id: str) -> Dict[str, Any]:
        """Get user information from Scalekit"""
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"Bearer {self.client_secret}",
                "Content-Type": "application/json"
            }
            
            response = await client.get(
                f"{self.base_url}/api/v1/users/{user_id}",
                headers=headers
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(
                    status_code=404,
                    detail="User not found"
                )
    
    async def check_permissions(self, user_id: str, resource: str, action: str) -> bool:
        """Check user permissions for specific resource and action"""
        async with httpx.AsyncClient() as client:
            headers = {
                "Authorization": f"Bearer {self.client_secret}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "user_id": user_id,
                "resource": resource,
                "action": action
            }
            
            response = await client.post(
                f"{self.base_url}/api/v1/authorize",
                headers=headers,
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("authorized", False)
            else:
                return False
    
    async def create_sso_url(self, redirect_uri: str, state: Optional[str] = None) -> str:
        """Create SSO authentication URL"""
        params = {
            "client_id": self.client_id,
            "redirect_uri": redirect_uri,
            "response_type": "code",
            "scope": "openid profile email"
        }
        
        if state:
            params["state"] = state
            
        query_string = "&".join([f"{k}={v}" for k, v in params.items()])
        return f"{self.base_url}/oauth/authorize?{query_string}"
    
    async def exchange_code(self, code: str, redirect_uri: str) -> Dict[str, Any]:
        """Exchange authorization code for access token"""
        async with httpx.AsyncClient() as client:
            payload = {
                "grant_type": "authorization_code",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "code": code,
                "redirect_uri": redirect_uri
            }
            
            response = await client.post(
                f"{self.base_url}/oauth/token",
                data=payload
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Failed to exchange authorization code"
                )

# Security dependency
security = HTTPBearer()
scalekit = ScalekitAuth()

async def get_current_user_scalekit(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> Dict[str, Any]:
    """Get current user using Scalekit authentication"""
    token = credentials.credentials
    user_data = await scalekit.validate_token(token)
    return user_data

async def require_permission(resource: str, action: str):
    """Decorator to require specific permission"""
    async def permission_checker(
        current_user: Dict[str, Any] = Depends(get_current_user_scalekit)
    ):
        user_id = current_user.get("sub")
        has_permission = await scalekit.check_permissions(user_id, resource, action)
        
        if not has_permission:
            raise HTTPException(
                status_code=403,
                detail=f"Insufficient permissions for {action} on {resource}"
            )
        
        return current_user
    
    return permission_checker

# Permission constants
class Permissions:
    # User management
    VIEW_USERS = "users:read"
    CREATE_USERS = "users:create"
    UPDATE_USERS = "users:update"
    DELETE_USERS = "users:delete"
    
    # Task management
    VIEW_TASKS = "tasks:read"
    CREATE_TASKS = "tasks:create"
    UPDATE_TASKS = "tasks:update"
    DELETE_TASKS = "tasks:delete"
    
    # Analytics
    VIEW_ANALYTICS = "analytics:read"
    EXPORT_ANALYTICS = "analytics:export"
    
    # Admin functions
    MANAGE_SYSTEM = "system:manage"
    VIEW_AUDIT_LOGS = "audit:read"
