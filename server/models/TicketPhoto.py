from .db import db

class TicketPhotoModel(db.Model):
    __tablename__ = "ticket_photo"

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'))

    def json(self):
        return {
            "id": self.id,
            "ticket_id": self.ticket_id,
            "photo_id": self.photo_id
        }

    @classmethod
    def get_by_ticket_id(cls, ticket_id: int):
        """
        Retrieves a TicketPhoto object from the database based on the given ticket ID.

        Parameters:
            ticket_id (int): The ID of the ticket.

        Returns:
            Query: A list of TicketPhoto objects filtered by the ticket ID.
        """
        return cls.query.filter_by(ticket_id=ticket_id).all()
