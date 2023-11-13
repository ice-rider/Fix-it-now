from flask_restful import Resource
from passlib.hash import bcrypt

from .utils.__jwt__ import create_access_token, jwt_required
from .utils.parsers import auth_parser
from models import *


class Auth(Resource):
    path = "/auth"

    @classmethod
    def post(cls):
        """
        This method handles the authentication request.

        ---
        tags:
          - Auth
        parameters:
          - in: body
            name: body
            description: JSON parameters.
            schema:
              properties:
                login:
                  type: string
                  description: The login of the user.
                  example: alice
                password:
                  type: string
                  description: The password of the user.
                  example: password
        
        responses:
          200:
            description: Successful authentication.
            schema:
              type: object
              properties:
                access_token:
                  type: string
          401:
            description: Invalid credentials.
        """
        args = auth_parser.parse_args()
        login = args.get('login')
        password = args.get('password')
        user = UserModel.auth(login, password)
        
        if not user:
            return {'message': 'Invalid credentials'}, 401

        session = SessionModel(user_id=user.id)
        payload = {
            'id': user.id,
            'role': user.role,
            'session_id': session.id
        }
        access_token = create_access_token(payload)
        session.token = access_token
        session.save()
        return {
            "access_token": access_token
        }, 200
