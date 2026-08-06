from app.providers.base import ImageProvider
from app.providers.gpt import GptProvider
from app.providers.hunyuan import HunyuanProvider


def get_provider(model: str) -> ImageProvider:
    if model == "hunyuan":
        return HunyuanProvider()
    if model == "gpt":
        return GptProvider()
    raise ValueError(f"unsupported model: {model}")
