from flask_restful import Api
from .auth import Auth, Logout
from .ticket import Ticket, TicketList
from .user import User


api = Api(prefix="/api")

for resource in [Auth, Logout, Ticket, TicketList, User]:
    api.add_resource(resource, resource.path)
