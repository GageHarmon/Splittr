from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    email = db.Column(db.String())
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    last_login = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())
    is_active = db.Column(db.Boolean, default=True)
    is_admin = db.Column(db.Boolean, default=False)

    serialize_rules = ('-bills.user', '-items.user', '-bill_users.user')


class Bills(db.Model, SerializerMixin):
    __tablename__ = 'bills'

    id = db.Column(db.Integer, primary_key=True)
    total_amount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)

    serialize_rules = ('-bill_items.bill', '-bill_users.bill', '-user.bills')


class Items(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    description = db.Column(db.String())
    price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String())
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # user = db.relationship('Users', backref='items')

    serialize_rules = ('-user.items',
                       '-bill_items.item')


class BillItems(db.Model, SerializerMixin):
    __tablename__ = 'bill_items'

    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)

    bill = db.relationship('Bills', backref='bill_items')
    item = db.relationship('Items', backref='bill_items')

    serialize_rules = ('-bill.bill_items', '-item.bill_items')


class BillUsers(db.Model, SerializerMixin):
    __tablename__ = 'bill_users'

    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    bill = db.relationship('Bills', backref='bill_users')
    user = db.relationship('Users', backref='bill_users')

    serialize_rules = ('-bill.bill_users', '-user.bill_users')
