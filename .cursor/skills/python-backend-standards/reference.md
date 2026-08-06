# Python Worker 规范 — 示例片段

按需取用。

## Settings

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_env: str = "development"
    redis_url: str = "redis://localhost:6379/0"
    hunyuan_api_key: str = ""
    hunyuan_base_url: str = "https://api.hunyuan.tencent.com/v1"
    openai_api_key: str = ""


settings = Settings()
```

## Provider protocol

```python
from typing import Protocol


class ImageProvider(Protocol):
    async def generate(
        self,
        *,
        prompt: str,
        mode: str,
        ref_image_url: str | None = None,
        size: str = "1024x1024",
    ) -> str:
        """Return image URL (remote or after OSS upload)."""
        ...
```

## Provider factory

```python
def get_provider(model: str) -> ImageProvider:
    if model == "hunyuan":
        return HunyuanProvider()
    if model == "gpt":
        return GptProvider()
    raise ValueError(f"unsupported model: {model}")
```

## Health router

```python
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health():
    return {"status": "ok"}
```

## Worker loop skeleton

```python
import logging

logger = logging.getLogger(__name__)


def run_worker() -> None:
    # connect redis here, not at import time
    logger.info("worker started")
    while True:
        job = fetch_next_job()  # implement later
        if not job:
            sleep(1)
            continue
        process_job(job)  # idempotent on taskId
```

## process_job 要点

1. 标记 `processing`（若 Worker 写库或回调 BFF）
2. `provider.generate(...)`
3. 如需则 `services.storage.upload_image(...)`
4. 标记 `done` + `result_url`；异常则 `failed`（退分由 BFF 负责或按技术方案约定）

## 映射技术方案旧名

| 技术方案 | 本规范 |
|----------|--------|
| `worker/models/*.py` | `app/providers/*.py` |
| `worker/main.py` | `app/main.py` |
| `worker/worker.py` | `app/worker.py` |
