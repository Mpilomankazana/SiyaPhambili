.DEFAULT_GOAL := help
.PHONY: help build up down logs dev-auth dev-core test lint migrate seed clean

help:            ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	 | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# --- Docker Compose Orchestration ---

build:           ## Build or rebuild all Docker images
	docker compose build

up:              ## Spin up the entire application stack in the background
	docker compose up -d --build

down:            ## Stop and remove all containers, networks, and volumes
	docker compose down

logs:            ## Tail the logs of all running services
	docker compose logs -f

# --- Local Host Execution (Temporary) ---

dev-auth:        ## Run the Auth Service locally on host (Port 8001)
	cd services/auth && uvicorn app.main:app --reload --port 8001

dev-core:        ## Run the Core Service locally on host (Port 8002)
	cd services/core && uvicorn app.main:app --reload --port 8002

# --- Testing & Quality Assurance ---

test:            ## Run automated tests in the running containers
	docker compose run --rm --no-deps auth-service pytest
	docker compose run --rm --no-deps core-service pytest

lint:            ## Run frontend ESLint checks
	cd frontend && npm run lint

migrate:         ## Apply Auth and Core database migrations
	docker compose run --build --rm auth-migrations
	docker compose run --build --rm core-migrations

seed: migrate    ## Seed demo accounts, sectors, and projects (requires DEMO_USER_PASSWORD)
	docker compose run --rm auth-service python app/seed.py
	docker compose run --rm core-service python app/seed.py

clean:           ## Prune unused Docker volumes, networks, and dangling images
	docker system prune -f