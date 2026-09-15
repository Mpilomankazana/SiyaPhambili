"""
Alembic environment — wired to read DATABASE_URL from the environment
so it matches whatever the running container/service uses. No models
are imported into target_metadata yet; wire app.models.Base.metadata
in once the Day 1 models exist (ROADMAP.md Phase 3).
"""
import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@siyaphambili_db:5432/siyaphambili_db")
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# TODO once models exist: from app.database import Base; target_metadata = Base.metadata
target_metadata = None


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
