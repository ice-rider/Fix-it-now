import requests

from flask_restful import Resource
from flask import request, current_app

from models import *
from .utils.parsers import post_ticket_parser
from flask_jwt_extended import jwt_required, get_jwt_identity


class Ticket(Resource):
    path = "/ticket"
    DEFAULT_PHOTO_URL = 'no-photo'

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
    @jwt_required()
    def post(cls):
        payload = get_jwt_identity()

        if payload.get('role') == 'worker':
            return {'message': 'Workers can not create tickets'}, 403

        # parse request
        args = post_ticket_parser.parse_args()

        # set default photo value
        photo_url = cls.DEFAULT_PHOTO_URL

        # uploading photo to cdn if it exists
        if args.get('photo'):
            raw_photo = args.get('photo')  # photo file in base64 format
            cdn_url = current_app.config.get('CDN_URL')
            response = requests.post(cdn_url+"/upload", json={'photo': raw_photo})

            if response.status_code == 201 and response.json:
                photo_url = current_app.get('CDN_URL') + response.json.get('id')

        # create ticket
        ticket = Ticket.create(
            teacher_id  = payload.get('id'),
            worker_id   = None,
            description = args.get('description'),
            location    = args.get('location'),
            photo       = photo_url
        )
        return {"ticket": ticket.json()}, 201

    @classmethod
    def patch(cls):
        pass

    @classmethod
    def delete(cls):
        pass


class TicketList(Resource):
    path = "/ticket-list"

    @classmethod
    def get(cls):
        tickets = TicketModel.get_all()
        
        if not tickets:
            return {"message": "tickets not found"}, 404

        return {"ticket_list": [t.json() for t in tickets]}, 200
