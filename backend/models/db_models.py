from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
from uuid import uuid4

def generate_uuid() -> str:
    return str(uuid4())

class RepositoryDB(BaseModel):
    id: str = Field(default_factory=generate_uuid, alias="_id")
    repo_name: str
    github_url: str
    user_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ReadmeDB(BaseModel):
    id: str = Field(default_factory=generate_uuid, alias="_id")
    repo_id: str
    content: str
    generated_at: datetime = Field(default_factory=datetime.utcnow)

class ScoreDB(BaseModel):
    id: str = Field(default_factory=generate_uuid, alias="_id")
    repo_id: str
    score_breakdown: Dict[str, float]
    total_score: float
    evaluated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class UserDB(BaseModel):
    id: str = Field(default_factory=generate_uuid, alias="_id")
    full_name: str
    email: str
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
