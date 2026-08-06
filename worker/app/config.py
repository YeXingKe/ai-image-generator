from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    redis_url: str = "redis://localhost:6379/0"
    hunyuan_api_key: str = ""
    hunyuan_base_url: str = "https://api.hunyuan.tencent.com/v1"
    openai_api_key: str = ""
    oss_endpoint: str = ""
    oss_bucket: str = ""
    oss_access_key_id: str = ""
    oss_access_key_secret: str = ""


settings = Settings()
