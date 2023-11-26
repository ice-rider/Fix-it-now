from flask_restful import Api
from .auth import Auth
from .ticket import Ticket
from .user import User


api = Api(prefix="/api")

for resource in [Auth, Ticket, User]:
    api.add_resource(resource, resource.path)
