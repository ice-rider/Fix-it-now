from .db import db

class PhotoModel(db.Model): 
    __tablename__ = "photo"
    
    id = db.Column(db.Integer, primary_key=True)
    src = db.Column(db.String)

    def json(self):
        return {
            "id": self.id,
            "src": self.src
        }

    def get_by_id(id):
        return PhotoModel.query.get(id)
