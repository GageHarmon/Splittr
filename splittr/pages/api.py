from flask import Flask
from flask_restful import Api, Resource, fields, marshal_with

app = Flask(__name__)
api = Api(app)

# Define a data model using Flask-RESTful fields
data_fields = {
    'name': fields.String,
    'age': fields.Integer,
    'city': fields.String
}

# Define some data to return
data = {
    'name': 'John Doe',
    'age': 30,
    'city': 'New York'
}

# Define a RESTful resource for the data


class Data(Resource):
    @marshal_with(data_fields)
    def get(self):
        return data


# Add the resource to the Flask-RESTful API
api.add_resource(Data, '/data')

if __name__ == '__main__':
    app.run()
