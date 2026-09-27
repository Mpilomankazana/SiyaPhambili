"""Add public summaries and owner/reviewer-visible solution details."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0003_project_summary_solution"
down_revision: Union[str, None] = "0002_public_contact_details"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("projects", sa.Column("description", sa.Text(), nullable=True))
    op.add_column("projects", sa.Column("solution", sa.Text(), nullable=True))


def downgrade() -> None:
    op.drop_column("projects", "solution")
    op.drop_column("projects", "description")
