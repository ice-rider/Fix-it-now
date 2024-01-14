from .db import db

class User(db.Model): 
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    login = db.Column(db.String(255))
    password = db.Column(db.String(255))
    role = db.Column(db.Enum('admin', 'worker', 'teacher'))
    avatar_id = db.Column(db.Integer, db.ForeignKey('user_photo.id'))