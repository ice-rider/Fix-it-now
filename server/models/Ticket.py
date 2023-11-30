from enum import Enum
from .db import db


class TicketStatus(Enum):
    OPEN = 'open'
    IN_WORK = 'in_work'
    CLOSED = 'closed'

class TicketModel(db.Model): 
    __tablename__ = "ticket"

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(255))
    subtitle = db.Column(db.String(255))
    description = db.Column(db.String(255))
    location = db.Column(db.String(255))
    status = db.Column(db.Enum(TicketStatus), default=TicketStatus.OPEN)

    def json(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "title": self.title,
            "subtitle": self.subtitle,
            "description": self.description,
            "location": self.location,
            "status": self.status,
            "photos": [photo.json() for photo in TicketPhoto.get_by_ticket_id(self.id)]
        }

    def get_by_id(id):
        return Ticket.query.filter_by(id=id).first()
    
    def patch(self, title: str, subtitle: str, description: str, location: str):
        if title:
            self.title = title
        if subtitle:
            self.subtitle = subtitle
        if description:
            self.description = description
        if location:
            self.location = location

    def set_status(self, status: str):
        self.status = status
