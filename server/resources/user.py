from flask_restful import Resource
from flask import Request

from models import *
from .utils.__jwt__ import jwt_required


class User(Resource):
    path = "/user"

    @classmethod
    def get(self):
        args = Request.json
        print(args)
        id = 3
        print(User)
        return User.get_by_id(id) or {'message': 'User not found'}, 404

    def post(self):
        return {'message': 'Create user'}, 201

    def patch(self):
        # Логика для обновления данных пользователя
        return {'message': 'Update user'}, 200

    def delete(self):
        # Логика для удаления пользователя
        return {'message': 'Delete user'}, 200