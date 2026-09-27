"""Store the contact details supplied by public project enquirers."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0002_public_contact_details"
down_revision: Union[str, None] = "0001_core_registry"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "contact_requests",
        sa.Column("requester_name", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "contact_requests",
        sa.Column("requester_email", sa.String(length=320), nullable=True),
    )
    op.add_column(
        "contact_requests",
        sa.Column("consent_given_at", sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("contact_requests", "consent_given_at")
    op.drop_column("contact_requests", "requester_email")
    op.drop_column("contact_requests", "requester_name")
