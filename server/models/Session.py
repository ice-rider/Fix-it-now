from .db import db

class SessionModel(db.Model): 
    __tablename__ = "session"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    blocked = db.Column(db.Boolean, default=False)

    def json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "blocked": self.blocked
        }
    
    def set_blocked(self):
        self.blocked = True

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_token_blocked(cls, session_id):
        session = cls.query.filter_by(id=session_id, blocked=True).first()
        return session.blocked
