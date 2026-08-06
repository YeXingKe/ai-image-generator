from fastapi import FastAPI

from app.routers import health

app = FastAPI(title="AI Image Worker", version="0.1.0")
app.include_router(health.router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "ai-image-worker", "docs": "/docs"}
