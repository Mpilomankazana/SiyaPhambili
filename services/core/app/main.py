"""
Core Registry & Stage-Gate Service — FastAPI entrypoint.
Scaffolding only. Business-logic routes are added during the hackathon
(see ROADMAP.md Phase 3) and mounted via app.routers.projects.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import projects, contact_requests

app = FastAPI(title="SiyaPhambili — Core Registry & Stage-Gate Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router, prefix="")
app.include_router(contact_requests.router, prefix="")


@app.get("/health")
def health():
    return {"status": "success", "message": "Core Service is live!"}
