from pydantic import BaseModel, field_validator, model_validator
from typing import Optional
from enum import Enum


class ReadmeStyle(str, Enum):
    minimal = "minimal"
    standard = "standard"
    detailed = "detailed"


class GenerateRequest(BaseModel):
    repo_url: str
    style: ReadmeStyle = ReadmeStyle.standard
    include_badges: bool = True
    include_toc: bool = True
    custom_sections: Optional[list[str]] = None

    @field_validator("repo_url", mode="before")
    @classmethod
    def validate_github_url(cls, v: str) -> str:
        v = str(v).strip().rstrip("/")
        if "github.com" not in v:
            raise ValueError("Only GitHub repository URLs are supported.")
        parts = v.replace("https://", "").replace("http://", "").split("/")
        if len(parts) < 3:
            raise ValueError("URL must be in format: https://github.com/owner/repo")
        return v


class RepoMetadata(BaseModel):
    owner: str
    name: str
    full_name: str
    description: Optional[str]
    language: Optional[str]
    languages: dict[str, int]
    stars: int
    forks: int
    open_issues: int
    topics: list[str]
    license: Optional[str]
    default_branch: str
    homepage: Optional[str]
    has_tests: bool
    has_ci: bool
    file_tree: list[str]
    key_files: dict[str, str]


class GenerateResponse(BaseModel):
    repo_url: str
    readme_content: str
    metadata: RepoMetadata
    tokens_used: int
    score: Optional[float] = None
    score_breakdown: Optional[dict] = None


class PreviewResponse(BaseModel):
    readme_content: str


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None


class RegenerateRequest(BaseModel):
    repo_url: str
    current_readme: str
    feedback: str
    style: ReadmeStyle = ReadmeStyle.standard
    include_badges: bool = True
    include_toc: bool = True
