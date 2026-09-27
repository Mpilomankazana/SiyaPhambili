"""Ensure the user-consent timestamp exists in databases with drifted history."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0003_repair_consent_timestamp"
down_revision: Union[str, None] = "0002_consent_timestamp"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    columns = {column["name"] for column in sa.inspect(op.get_bind()).get_columns("users")}
    if "consent_given_at" not in columns:
        op.add_column(
            "users",
            sa.Column("consent_given_at", sa.DateTime(timezone=True), nullable=True),
        )


def downgrade() -> None:
    columns = {column["name"] for column in sa.inspect(op.get_bind()).get_columns("users")}
    if "consent_given_at" in columns:
        op.drop_column("users", "consent_given_at")
