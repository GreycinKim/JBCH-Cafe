from flask import Blueprint, request, jsonify
from models.event import Event
from db import db
import json
from sqlalchemy import text

events_bp = Blueprint('events', __name__, url_prefix="/api")

# GET or POST calendar events
@events_bp.route('/events', methods=['GET', 'POST'])
def handle_events():
    if request.method == 'GET':
        events = Event.query.all()
        return jsonify([event.to_dict() for event in events]), 200

    elif request.method == 'POST':
        data = request.get_json()
        try:
            new_event = Event(
                title=data['title'],
                start=data['start'],
                end=data['end']
            )
            db.session.add(new_event)
            db.session.commit()
            return jsonify({"message": "Event added successfully."}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 400

# ✅ POST orders using SQLAlchemy engine (no cursor)
@events_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    name = data.get("name", "Guest")
    cart = data.get("cart")
    payment = data.get("payment")
    total = sum(item["price"] for item in cart) if cart else 0

    if not cart or not payment:
        return jsonify({"error": "Missing cart or payment"}), 400

    try:
        # Get engine from db (SQLAlchemy)
        engine = db.get_engine()

        with engine.begin() as conn:
            result = conn.execute(
                text("INSERT INTO orders (name, payment, items, total) VALUES (:name, :payment, :items, :total) RETURNING id"),
                {
                    "name": name,
                    "payment": json.dumps(payment),
                    "items": json.dumps(cart),
                    "total": total
                }
            )
            order_id = result.fetchone()[0]

        return jsonify({"message": "Order created", "order_id": order_id}), 201

    except Exception as e:
        print("Order insert error:", e)
        return jsonify({"error": str(e)}), 500
