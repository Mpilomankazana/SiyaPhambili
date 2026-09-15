"""
Auth Service — FastAPI entrypoint.
Scaffolding only. Business-logic routes are added during the hackathon
(see ROADMAP.md Phase 3) and mounted via app.routers.auth.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth

app = FastAPI(title="SiyaPhambili — Auth Service")

# Dev-time CORS: tighten the origin list before deploying to Render.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="")


@app.get("/health")
def health():
    return {"status": "success", "message": "Auth Service is live!"}
