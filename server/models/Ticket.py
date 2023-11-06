from .db import db

class Ticket(db.Model): 
    __tablename__ = "ticket"

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(255))
    subtitle = db.Column(db.String(255))
    description = db.Column(db.String(255))
    location = db.Column(db.String(255))
    status = db.Column(db.Enum('open', 'in_work', 'closed'))
    photos = db.relationship('ticket_photo')