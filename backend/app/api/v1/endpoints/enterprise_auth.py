from fastapi import APIRouter, Depends, HTTPException, Query
from app.services.scalekit_service import scalekit, get_current_user_scalekit, require_permission, Permissions
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class SSORequest(BaseModel):
    redirect_uri: str
    state: Optional[str] = None

class TokenExchangeRequest(BaseModel):
    code: str
    redirect_uri: str

@router.post("/sso/authorize")
async def create_sso_url(request: SSORequest):
    """Create SSO authorization URL"""
    try:
        sso_url = await scalekit.create_sso_url(
            request.redirect_uri,
            request.state
        )
        return {"sso_url": sso_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/sso/token")
async def exchange_token(request: TokenExchangeRequest):
    """Exchange authorization code for access token"""
    try:
        token_data = await scalekit.exchange_code(
            request.code,
            request.redirect_uri
        )
        return token_data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/profile")
async def get_enterprise_profile(
    current_user = Depends(get_current_user_scalekit)
):
    """Get enterprise user profile"""
    return current_user

@router.get("/permissions")
async def check_user_permissions(
    resource: str = Query(..., description="Resource to check permissions for"),
    action: str = Query(..., description="Action to check permissions for"),
    current_user = Depends(get_current_user_scalekit)
):
    """Check if user has specific permissions"""
    user_id = current_user.get("sub")
    has_permission = await scalekit.check_permissions(user_id, resource, action)
    
    return {
        "user_id": user_id,
        "resource": resource,
        "action": action,
        "authorized": has_permission
    }

@router.get("/admin/users")
async def list_enterprise_users(
    current_user = Depends(require_permission("users", "read"))
):
    """List all enterprise users (admin only)"""
    # This would typically fetch from your user database
    # with additional enterprise metadata
    return {"message": "Enterprise users list", "user": current_user}

@router.get("/audit-logs")
async def get_audit_logs(
    current_user = Depends(require_permission("audit", "read"))
):
    """Get audit logs (admin only)"""
    return {"message": "Audit logs", "user": current_user}

@router.post("/admin/sync-users")
async def sync_enterprise_users(
    current_user = Depends(require_permission("system", "manage"))
):
    """Sync users from enterprise directory"""
    return {"message": "User sync initiated", "user": current_user}
