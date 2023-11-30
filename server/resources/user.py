from flask_restful import Resource
from flask import request

from models import *
from .utils.__jwt__ import jwt_required


class User(Resource):
    path = "/user"

    def get(self):
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
        # Логика для обновления данных пользователя
        return {'message': 'Update user'}, 200

    def delete(self):
        # Логика для удаления пользователя
        return {'message': 'Delete user'}, 200


