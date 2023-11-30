from flask_restful import Resource
from passlib.hash import bcrypt

from .utils.__jwt__ import create_access_token, jwt_required
from .utils.parsers import auth_parser
from models import *


class Auth(Resource):
    path = "/auth"

    @classmethod
    def post(cls):
        args = auth_parser.parse_args()
        login, password = args["login"], args["password"]
        try:
            user = UserModel.auth(login, password)
        except ValueError:
            return {'message': 'User not found'}, 404
        
        if not user:
            return {'message': 'Invalid credentials'}, 401

        session = SessionModel(user_id=user.id)
        session.save()
        
        payload = {
            'id': user.id,
            'role': user.role.value,
            'session_id': session.id
        }

        access_token = create_access_token(payload)
        session.token = access_token
        session.save()
        return {
            "access_token": access_token,
            "user": user.json()
        }, 200
