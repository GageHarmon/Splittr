from flask import Flask, make_response, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource, fields, marshal_with

from models import db, Users, Bills, Items, BillItems, BillUsers

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///splittr.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


class AllUsers(Resource):
    def get(self):
        users = Users.query.all()
        users_list = [users.to_dict() for users in users]
        response = make_response(jsonify(users_list), 200)

        return response

    def post(self):
        data = request.get_json()
        user = Users(username=data['username'],
                     password=data['password'], email=data['email'])
        db.session.add(user)
        db.session.commit()
        response = make_response(jsonify(user.to_dict()), 201)

        return response


api.add_resource(AllUsers, '/users')


class UsersById(Resource):
    def get(self, id):
        user = Users.query.get(id)
        response = make_response(jsonify(user.to_dict()), 200)

        return response

    def patch(self, id):
        data = request.get_json()
        user = Users.query.get(id)
        user.username = data['username']
        user.password = data['password']
        user.email = data['email']
        db.session.commit()
        response = make_response(jsonify(user.to_dict()), 200)

        return response

    def delete(self, id):
        user = Users.query.get(id)
        db.session.delete(user)
        db.session.commit()
        response = make_response(jsonify(user.to_dict()), 200)

        return response


api.add_resource(UsersById, '/users/<int:id>')


class AllBills(Resource):
    def get(self):
        bills = Bills.query.all()
        bills_list = [bills.to_dict() for bills in bills]
        response = make_response(jsonify(bills_list), 200)

        return response

    def post(self):
        data = request.get_json()
        bill = Bills(total_amount=data['total_amount'],
                     created_by_user_id=data['created_by_user_id'])
        db.session.add(bill)
        db.session.commit()
        response = make_response(jsonify(bill.to_dict()), 201)

        return response


api.add_resource(AllBills, '/bills')


class BillsById(Resource):
    def get(self, id):
        bill = Bills.query.get(id)
        response = make_response(jsonify(bill.to_dict()), 200)

        return response

    def patch(self, id):
        data = request.get_json()
        bill = Bills.query.get(id)
        bill.total_amount = data['total_amount']
        bill.created_by_user_id = data['created_by_user_id']
        db.session.commit()
        response = make_response(jsonify(bill.to_dict()), 200)

        return response

    def delete(self, id):
        bill = Bills.query.get(id)
        db.session.delete(bill)
        db.session.commit()
        response = make_response(jsonify(bill.to_dict()), 200)

        return response


api.add_resource(BillsById, '/bills/<int:id>')


class AllItems(Resource):
    def get(self):
        items = Items.query.all()
        items_list = [items.to_dict() for items in items]
        response = make_response(jsonify(items_list), 200)

        return response

    def post(self):
        data = request.get_json()
        item = Items(name=data['name'], price=data['price'])
        db.session.add(item)
        db.session.commit()
        response = make_response(jsonify(item.to_dict()), 201)

        return response


api.add_resource(AllItems, '/items')


class ItemsById(Resource):
    def get(self, id):
        item = Items.query.get(id)
        response = make_response(jsonify(item.to_dict()), 200)

        return response

    def patch(self, id):
        data = request.get_json()
        item = Items.query.get(id)
        item.name = data['name']
        item.price = data['price']
        db.session.commit()
        response = make_response(jsonify(item.to_dict()), 200)

        return response

    def delete(self, id):
        item = Items.query.get(id)
        db.session.delete(item)
        db.session.commit()
        response = make_response(jsonify(item.to_dict()), 200)

        return response


api.add_resource(ItemsById, '/items/<int:id>')


class AllBillItems(Resource):
    def get(self):
        bill_items = BillItems.query.all()
        bill_items_list = [bill_items.to_dict() for bill_items in bill_items]
        response = make_response(jsonify(bill_items_list), 200)

        return response

    def post(self):
        data = request.get_json()
        bill_item = BillItems(bill_id=data['bill_id'], item_id=data['item_id'])
        db.session.add(bill_item)
        db.session.commit()
        response = make_response(jsonify(bill_item.to_dict()), 201)

        return response


api.add_resource(AllBillItems, '/bill_items')


class BillItemsById(Resource):
    def get(self, id):
        bill_item = BillItems.query.get(id)
        response = make_response(jsonify(bill_item.to_dict()), 200)

        return response

    def patch(self, id):
        data = request.get_json()
        bill_item = BillItems.query.get(id)
        bill_item.bill_id = data['bill_id']
        bill_item.item_id = data['item_id']
        db.session.commit()
        response = make_response(jsonify(bill_item.to_dict()), 200)

        return response

    def delete(self, id):
        bill_item = BillItems.query.get(id)
        db.session.delete(bill_item)
        db.session.commit()
        response = make_response(jsonify(bill_item.to_dict()), 200)

        return response


api.add_resource(BillItemsById, '/bill_items/<int:id>')


class AllBillUsers(Resource):
    def get(self):
        bill_users = BillUsers.query.all()
        bill_users_list = [bill_users.to_dict() for bill_users in bill_users]
        response = make_response(jsonify(bill_users_list), 200)

        return response

    def post(self):
        data = request.get_json()
        bill_user = BillUsers(user_id=data['user_id'], bill_id=data['bill_id'])
        db.session.add(bill_user)
        db.session.commit()
        response = make_response(jsonify(bill_user.to_dict()), 201)

        return response


api.add_resource(AllBillUsers, '/bill_users')


class BillUsersById(Resource):
    def get(self, id):
        bill_user = BillUsers.query.get(id)
        response = make_response(jsonify(bill_user.to_dict()), 200)

        return response

    def patch(self, id):
        data = request.get_json()
        bill_user = BillUsers.query.get(id)
        bill_user.user_id = data['user_id']
        bill_user.bill_id = data['bill_id']
        db.session.commit()
        response = make_response(jsonify(bill_user.to_dict()), 200)

        return response

    def delete(self, id):
        bill_user = BillUsers.query.get(id)
        db.session.delete(bill_user)
        db.session.commit()
        response = make_response(jsonify(bill_user.to_dict()), 200)

        return response


api.add_resource(BillUsersById, '/bill_users/<int:id>')

if __name__ == '__main__':
    app.run()
