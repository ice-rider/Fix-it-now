from flask_restful import Resource
from flask import request

from models import *
from .utils.parsers import post_ticket_parser
from .utils.__jwt__ import jwt_required


class Ticket(Resource):
    path = "/ticket"

    @classmethod
    def get(cls):
        params = request.args
        if not params.get('id'):
            return {'message': "Ticket ID is required param"}, 400
        
        ticket = TicketModel.get_by_id(params['id'])
        if not ticket:
            return {'message': 'Ticket not found'}, 404
        return Ticket.get_by_id(id)

    @classmethod
    def post(cls):
        payload = jwt_required.parse_args()
        if payload.get('role') != 'teacher':
            return {'message': 'Only teachers can create tickets'}, 403

        args = post_ticket_parser.parse_args()
        ticket = Ticket.create(
            teacher_id  = payload.get('id'),
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
    def patch(cls):
        pass    

    @classmethod
    def delete(cls):
        pass