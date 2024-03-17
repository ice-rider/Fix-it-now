import requests
from typing import Union

from flask_restful import Resource
from flask import request, current_app

from models import TicketModel
from flask_jwt_extended import jwt_required, get_jwt_identity


class Ticket(Resource):
    path = "/ticket"
    DEFAULT_PHOTO_URL = 'no-photo'

    @classmethod
    def get(cls) -> Union[dict, int]:
        params = request.args
        if not params.get('id'):
            return {'message': "Ticket ID is required"}, 400
        
        ticket = TicketModel.get_by_id(params['id'])

        if not ticket:
            return {'message': 'Ticket not found'}, 404

        return ticket, 200

    @classmethod
    @jwt_required()
    def post(cls) -> Union[dict, int]:
        payload = get_jwt_identity()

        if payload.get('role') == 'worker':
            return {'message': 'Workers can not create tickets'}, 403

        args = request.json

        photo_url = cls.DEFAULT_PHOTO_URL

        if args.get('image'):                   # TODO: нах снести это, добавить async, а лучше celery
            raw_photo = args.get('image')       # photo file in base64 format
            cdn_url = current_app.config.get('CDN_URL')
            response = requests.post(cdn_url+"upload", json={'image': raw_photo})

            print("response:", response)

            if response.status_code == 201 and response.json:      # и вообще потом порефакторить
                photo_url = cdn_url + response.json().get('url')

        ticket = TicketModel(
            author_id  = payload.get('id'),
            worker_id   = None,
            section     = args.get('section'),
            description = args.get('description'),
            location    = args.get('location'),
            photo       = photo_url
        )
        ticket.save()
        return {"ticket": ticket.json()}, 201

    @classmethod
    @jwt_required()
    def patch(cls) -> Union[dict, int]:
        args = request.get_json()
        if not args or not args.get('status') or not args.get('ticket_id'):
            return {"message": "missed args status or ticket_id;"}, 400
        
        payload = get_jwt_identity()

        ticket = TicketModel.get_by_id(args['ticket_id'])
        if payload.get('role') == "worker" and args["status"] == 'in_work':
            ticket.set_status('in_work')
            return {"message": "successfully get ticket in work"}, 201

        if payload.get('role') != "worker" and args["status"] == "closed":
            ticket.set_status('closed')
            return {"message": "ticket successfully closed"}

        
        return {"message": "you can not set this status", "payload": payload, "args": args}, 403


class TicketList(Resource):
    path = "/ticket-list"

    @classmethod
    def get(cls) -> Union[dict, int]:
        tickets = TicketModel.get_all()
        
        if not tickets:
            return {"ticket_list": []}, 200

        return {"ticket_list": [t.json() for t in tickets]}, 200
