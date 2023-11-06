from .db import db

class Session(db.Model): 
    __tablename__ = "session"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    token = db.Column(db.String(255))
    blocked = db.Column(db.Boolean, default=False)
