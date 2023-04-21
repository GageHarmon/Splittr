from flask import Flask, make_response, request, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, Users, Bills, Items, BillItems, BillUsers

# from flask_bcrypt import Bcrypt
from services import app, bcrypt, db
# Imports for using .env
import os
from dotenv import load_dotenv
# Load the env file
load_dotenv()
# Use os.environ.get() to get the data

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///splittr.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)

app.secret_key = os.environ.get("secretkey")


@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    data = request.get_json()
    user = Users.query.get(user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    if 'username' in data:
        user.username = data['username']
        db.session.commit()

    return jsonify(user.to_dict()), 200


class AllUsers(Resource):
    def get(self):
        users = Users.query.all()
        users_list = [users.to_dict() for users in users]
        response = make_response(jsonify(users_list), 200)

        return response

    def post(self):
        data = request.get_json()
        user = Users(username=data['username'], email=data['email'])
        user.password_hash = data['password']
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

        # for user in data['bill_users']:
        #     bill = Bills(
        #         total_amount=data['total_amount'], user_id=user['user_id'])
        #     db.session.add(bill)

        bill = Bills(
            total_amount=data['total_amount'], user_id=session.get('user_id'))
        db.session.add(bill)
        db.session.commit()
        print(bill.id)

        for user in data['bill_users']:
            bill_user = BillUsers(
                bill_id=bill.id, user_id=user['user_id'])
            db.session.add(bill_user)

        db.session.commit()
        response = make_response(
            jsonify([bill.to_dict() for bill in Bills.query.all()]), 201)

        return response


api.add_resource(AllBills, '/bills')


class BillsById(Resource):
    def get(self, id):
        bill = Bills.query.get(id)
        response = make_response(jsonify(bill.to_dict()), 200)

        return response

    def post(self, id):
        data = request.get_json()
        bill = Bills.query.get(id)
        bill.total_amount = data['total_amount']
        bill.user_id = data['user_id']
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
        item = Items(title=data['title'], price=data['price'])
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
        item.title = data['title']
        item.description = data['description']
        item.price = data['price']
        item.status = data['status']
        item.user_id = data['user_id']
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

    def patch(self, id):
        bill_user = BillUsers.query.filter_by(id=id).first()
        if not bill_user:
            return {'message': 'Bill user not found'}, 404

        data = request.get_json()
        if 'user_id' in data:
            bill_user.user_id = data['user_id']
        if 'bill_id' in data:
            bill_user.bill_id = data['bill_id']

        db.session.commit()
        return jsonify(bill_user.to_dict()), 200

    def delete(self, id):
        bill_user = BillUsers.query.filter_by(id=id).first()
        if not bill_user:
            return {'message': 'Bill user not found'}, 404

        db.session.delete(bill_user)
        db.session.commit()
        return {'message': 'Bill user deleted successfully'}, 200


api.add_resource(AllBillUsers, '/bill_users', '/bill_users/<int:id>')


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


class Login(Resource):
    def post(self):
        try:
            jsoned_request = request.get_json()
            user = Users.query.filter(
                Users.username == jsoned_request["username"]).first()
            if user.authenticate(jsoned_request["password"]):
                session['user_id'] = user.id
                res = make_response(jsonify(user.to_dict()), 200)
                return res
        except Exception as e:
                res = make_response(jsonify({"error": [e.__str__()]}), 500)
                return res


api.add_resource(Login, '/login')


class get_logged_user(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = Users.query.filter(Users.id == session["user_id"]).first()
            res = make_response(jsonify(user.to_dict()), 200)
            return res


api.add_resource(get_logged_user, '/logged_user')


class check_logged_in(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            if user_id != None:
                return make_response({"logged_in": True}, 200)
        return make_response({"logged_in": False}, 200)


api.add_resource(check_logged_in, '/check')

class logout(Resource):
    def delete(self):
        session['user_id'] = None
        res = make_response(jsonify({ "login" : "Logged out"}),200)
        return res
api.add_resource(logout, '/logout')

# @app.before_request
# def print_hello():
#     if session.get("user_id"):
#         user = Users.query.filter(Users.id == session["user_id"]).first()
#         if user:
#             session["valid"] = True
#         else:
#             session["valid"] = False
#     else:
#         session["valid"] = False


if __name__ == '__main__':
    app.run()
