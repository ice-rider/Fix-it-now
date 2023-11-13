from flask_restful import Resource

from models import *
from .utils.parsers import get_ticket_parser, post_ticket_parser
from .utils.__jwt__ import jwt_required


class Ticket(Resource):
    path = "/ticket"

    @classmethod
    def get(cls):
        args = get_ticket_parser.parse_args()
        id = args.get('id')
        return Ticket.get_by_id(id)

    @classmethod
    def post(cls):
        payload = jwt_required.parse_args()
        if payload.get('role') != 'teacher':
            return {'message': 'Only teachers can create tickets'}, 403

        args = post_ticket_parser.parse_args()
        ticket = Ticket.create(
            teacher_id  = args.get('teacher_id'),
            title       = args.get('title'),
            subtitle    = args.get('subtitle'),
            description = args.get('description'),
            location    = args.get('location')
        )
        return ticket.json(), 201

    @classmethod
    def put(cls):
        pass

    @classmethod
    def delete(cls):
        pass