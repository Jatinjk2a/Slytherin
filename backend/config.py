from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    xai_api_key: str = ""
    github_token: str | None = None
    grok_model: str = "llama-3.3-70b-versatile"
    max_files_to_parse: int = 200
    max_file_size_kb: int = 100
    
    class Config:
        env_file = ".env"

settings = Settings()
