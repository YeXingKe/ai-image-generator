from app.config import settings


class GptProvider:
    async def generate(
        self,
        *,
        prompt: str,
        mode: str,
        ref_image_url: str | None = None,
        size: str = "1024x1024",
    ) -> str:
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY is not configured")
        raise NotImplementedError("GPT provider not wired yet")
