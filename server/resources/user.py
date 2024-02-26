from flask_restful_api import Resource
from flask import request

from models import *


class User(Resource):
    path = "/user"
    @classmethod
    def get(cls):
        params = request.args
        if not params.get('id'):
            return {'message': "User ID is required param"}, 400

        user = UserModel.get_by_id(params['id'])
        if not user:
            return {'message': 'User not found'}, 404
        return user.json(), 200

    def post(self):
        return {'message': 'Create user'}, 201

    def patch(self):
        return {'message': 'Update user'}, 200

    def delete(self):
        return {'message': 'Delete user'}, 200


class UserByID(Resource):
    path = "/user/<int:id>"

    @classmethod
    def get(cls, id):
        user = UserModel.get_by_id(id)

        if not user:
            return {'message': 'User not found'}, 404
        
        return user.json(), 200