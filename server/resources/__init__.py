from flask_restful import Api
from .auth import Auth, Logout
from .ticket import Ticket, TicketList
from .user import User, UserByID


api = Api(prefix="/api")

for endpoint in [Auth, Logout, Ticket, TicketList, User, UserByID]:
    api.add_resource(endpoint, endpoint.path)
