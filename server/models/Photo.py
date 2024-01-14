from .db import db

class Photo(db.Model): 
    __tablename__ = "photo"
    
    id = db.Column(db.Integer, primary_key=True)
    src = db.Column(db.String)