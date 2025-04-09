from db import db
import json
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    payment = db.Column(db.Text)  # store JSON (e.g., {type: "Venmo"})
    items = db.Column(db.Text)    # store JSON-encoded cart
    total = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "payment": json.loads(self.payment),
            "items": json.loads(self.items),
            "total": self.total,
            "created_at": self.created_at.isoformat()
        }
