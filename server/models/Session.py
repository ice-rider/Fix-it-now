from .db import db

class SessionModel(db.Model): 
    __tablename__ = "session"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    token = db.Column(db.String(255))
    blocked = db.Column(db.Boolean, default=False)

    def json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "token": self.token,
            "blocked": self.blocked
        }
    
    def set_blocked(self):
        self.blocked = True

    def save(self):
        db.session.add(self)
        db.session.commit()