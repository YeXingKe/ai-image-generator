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
