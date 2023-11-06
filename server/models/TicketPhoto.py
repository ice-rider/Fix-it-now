from .db import db

class TicketPhoto(db.Model):
    __tablename__ = "ticket_photo"

    id = db.Column(db.Integer, primary_key=True)
    blobImage = db.Column(db.LargeBinary)
