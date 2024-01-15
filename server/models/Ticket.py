from enum import Enum
from .db import db


class TicketStatus(Enum):
    OPEN = 'open'
    IN_WORK = 'in_work'
    CLOSED = 'closed'

class TicketModel(db.Model): 
    __tablename__ = "ticket"

    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    description = db.Column(db.String(500))
    location = db.Column(db.String(100))
    status = db.Column(db.Enum(TicketStatus), default=TicketStatus.OPEN)
    photo = db.Column(db.String, default="no-photo")

    def json(self):
        return {
            "id": self.id,
            "section": self.section,
            "teacher_id": self.teacher_id,
            "worker_id": self.worker_id,
            "description": self.description,
            "location": self.location,
            "status": self.status.value,
            "photo_url": self.photo
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def set_status(self, status: str):
        self.status = TicketStatus(status)
