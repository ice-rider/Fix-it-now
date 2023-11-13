from .db import db

class FeedbackModel(db.Model): 
    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comment = db.Column(db.String(255))
    rate = db.Column(db.Integer, default=0)
    fix_date = db.Column(db.DateTime)

    def json(self):
        return {
            "id": self.id,
            "worker_id": self.worker_id,
            "comment": self.comment,
            "rate": self.rate,
            "fix_date": self.fix_date
        }

    def rate(self, rate: int):
        self.rate = rate
    
    def patch(self, comment: str):
        self.comment = comment
