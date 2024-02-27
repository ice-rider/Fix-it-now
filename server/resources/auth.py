from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import *


class Auth(Resource):
    path = "/auth"

    @classmethod
    def post(cls):
        args = request.json
        login, password = args["login"], args["password"]

        if not login or not password:
            return {"message": "Login and password are required"}, 400
        
        user = UserModel.auth(login, password)

        session = SessionModel(user_id=user.id)
        session.save()
        
        payload = {
            'id': user.id,
            'role': user.role.value,
            'session_id': session.id
        }

        return {
            "access_token": create_access_token(payload),
            "user": user.json()
        }, 200


class Logout(Resource):
    path = "/logout"

    @classmethod
    @jwt_required()
    def post(cls):
        session_id = get_jwt_identity().get("session_id")
        SessionModel.set_blocked(session_id)
        return {"message": "Logged out successfully"}, 200