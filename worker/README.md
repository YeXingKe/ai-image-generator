# AI Image Worker

Python FastAPI worker for stage B (model calls, queue consumer, OSS).

MVP stage A can skip deploying this service; Next.js may call cloud image APIs directly.

## Setup

```bash
cd worker
python -m venv .venv
# Windows
.venv\Scripts\activate
# Unix
# source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

- Health: `http://localhost:8000/health`
- Docs: `http://localhost:8000/docs`

## Task message contract (from BFF)

```json
{
  "taskId": "uuid",
  "userId": "uuid",
  "model": "hunyuan",
  "mode": "text_to_image",
  "prompt": "...",
  "refImageUrl": null,
  "cost": 2
}
```

Credits are owned by the Next.js BFF; this worker does not debit balances.
