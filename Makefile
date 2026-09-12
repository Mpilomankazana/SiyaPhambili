.DEFAULT_GOAL := help
.PHONY: help build up down logs dev-auth dev-core test lint clean

help:            ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	 | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# --- Docker Compose Orchestration ---

build:           ## Build or rebuild all Docker images
	docker compose build

up:              ## Spin up the entire application stack in the background
	docker compose up -d

down:            ## Stop and remove all containers, networks, and volumes
	docker compose down

logs:            ## Tail the logs of all running services
	docker compose logs -f

# --- Local Host Execution (Temporary) ---

dev-auth:        ## Run the Auth Service locally on host (Port 8001)
	cd services/auth && uvicorn main:app --reload --port 8001

dev-core:        ## Run the Core Service locally on host (Port 8002)
	cd services/core && uvicorn main:app --reload --port 8002

# --- Testing & Quality Assurance ---

test:            ## Run automated tests in the running containers
	docker compose exec auth-service pytest
	docker compose exec core-service pytest

lint:            ## Run Python code formatting checks (flake8/black)
	flake8 services/ gateway/
	black --check services/ gateway/

clean:           ## Prune unused Docker volumes, networks, and dangling images
	docker system prune -f