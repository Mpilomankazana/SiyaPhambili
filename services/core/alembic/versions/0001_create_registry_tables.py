"""Create Core registry tables and seed project sectors."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0001_core_registry"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "sectors",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False, unique=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    op.create_table(
        "projects",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.String(length=36), nullable=False),
        sa.Column("sector_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("problem_statement", sa.Text(), nullable=False),
        sa.Column("current_stage", sa.String(length=50), server_default="Idea", nullable=False),
        sa.Column("license_type", sa.String(length=50), server_default="Other", nullable=False),
        sa.Column("license_note", sa.Text(), nullable=True),
        sa.Column("contact_required", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("visibility", sa.String(length=30), server_default="public", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["sector_id"], ["sectors.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_projects_user_id", "projects", ["user_id"])

    op.create_table(
        "stage_gate_history",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("project_id", sa.Uuid(), nullable=False),
        sa.Column("updated_by", sa.String(length=36), nullable=False),
        sa.Column("previous_stage", sa.String(length=50), nullable=False),
        sa.Column("new_stage", sa.String(length=50), nullable=False),
        sa.Column("verification_notes", sa.Text(), nullable=True),
        sa.Column("transitioned_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["project_id"], ["projects.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "contact_requests",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("project_id", sa.Uuid(), nullable=False),
        sa.Column("requested_by", sa.String(length=36), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("status", sa.String(length=20), server_default="pending", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["project_id"], ["projects.id"]),
        sa.PrimaryKeyConstraint("id"),
    )

    sectors = sa.table(
        "sectors",
        sa.column("name", sa.String(length=120)),
        sa.column("description", sa.Text()),
    )
    op.bulk_insert(
        sectors,
        [
            {"name": "Agriculture", "description": "Agriculture and food systems"},
            {"name": "Education", "description": "Education and learning"},
            {"name": "Healthcare", "description": "Health and wellbeing"},
            {"name": "Technology", "description": "Digital and emerging technology"},
            {"name": "Community Development", "description": "Community and local development"},
        ],
    )


def downgrade() -> None:
    op.drop_table("contact_requests")
    op.drop_table("stage_gate_history")
    op.drop_index("ix_projects_user_id", table_name="projects")
    op.drop_table("projects")
    op.drop_table("sectors")