from app.config import settings


class HunyuanProvider:
    async def generate(
        self,
        *,
        prompt: str,
        mode: str,
        ref_image_url: str | None = None,
        size: str = "1024x1024",
    ) -> str:
        if not settings.hunyuan_api_key:
            raise RuntimeError("HUNYUAN_API_KEY is not configured")
        raise NotImplementedError("Hunyuan provider not wired yet")
