from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    xai_api_key: str = ""
    github_token: str | None = None
    grok_model: str = "llama-3.3-70b-versatile"
    mongo_uri: str = "mongodb://localhost:27017"
    max_files_to_parse: int = 200
    max_file_size_kb: int = 100

    # JWT Auth
    jwt_secret: str = "readme-ai-super-secret-jwt-key-change-in-production-2024"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440  # 24 hours

    class Config:
        env_file = ".env"

settings = Settings()
