from db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    start = db.Column(db.String(255), nullable=False)
    end = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "start": self.start,
            "end": self.end
        }
