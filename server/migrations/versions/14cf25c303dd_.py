"""empty message

Revision ID: 14cf25c303dd
Revises: f47581eff9ea
Create Date: 2023-04-20 15:37:38.498938

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '14cf25c303dd'
down_revision = 'f47581eff9ea'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=False))

    # ### end Alembic commands ###