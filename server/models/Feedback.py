from .db import db

class Feedback(db.Model): 
    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comment = db.Column(db.String(255))
    rate = db.Column(db.Integer)
    fix_date = db.Column(db.DateTime)
