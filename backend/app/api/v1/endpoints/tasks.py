from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.models import User, Task
from app.schemas.schemas import Task as TaskSchema, TaskCreate, TaskUpdate

router = APIRouter()

@router.get("/", response_model=List[TaskSchema])
async def get_tasks(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tasks = db.query(Task).filter(Task.assignee_id == current_user.id).offset(skip).limit(limit).all()
    return tasks

@router.post("/", response_model=TaskSchema)
async def create_task(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = Task(
        **task_data.dict(),
        created_by=current_user.id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.get("/{task_id}", response_model=TaskSchema)
async def get_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Check if user has access to this task
    if task.assignee_id != current_user.id and task.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    return task

@router.put("/{task_id}", response_model=TaskSchema)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Check if user has access to this task
    if task.assignee_id != current_user.id and task.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update task fields
    for field, value in task_update.dict(exclude_unset=True).items():
        setattr(task, field, value)
    
    # Set completed_at if status is completed
    if task_update.status == "completed" and not task.completed_at:
        from datetime import datetime
        task.completed_at = datetime.utcnow()
    
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
async def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Check if user has access to this task
    if task.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
