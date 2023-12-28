from enum import Enum
from .db import db


class TicketStatus(Enum):
    OPEN = 'open'
    IN_WORK = 'in_work'
    CLOSED = 'closed'

class TicketModel(db.Model): 
    __tablename__ = "ticket"

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    description = db.Column(db.String(500))
    location = db.Column(db.String(100))
    status = db.Column(db.Enum(TicketStatus), default=TicketStatus.OPEN)
    photo = db.Column(db.String, default="no-photo")

    def json(self):
        return {
            "id": self.id,
            "teacher_id": self.teacher_id,
            "worker_id": self.worker_id,
            "description": self.description,
            "location": self.location,
            "status": self.status.value
        }

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
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
        self.status = TicketStatus(status)
