from flask import Blueprint, request, jsonify
from models.order import Order
from models.event import Event

from db import db
import json
from collections import defaultdict
events_bp = Blueprint('events', __name__, url_prefix="/api")

# GET all orders
@events_bp.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# POST new order
@events_bp.route("/orders", methods=["POST"])
def create_order():
    data = request.get_json()
    name = data.get("name", "Guest")
    cart = data.get("cart")
    payment = data.get("payment")

    if not cart or not payment:
        return jsonify({"error": "Missing cart or payment"}), 400

    # Calculate total considering quantity
    total = sum(item["price"] * item.get("quantity", 1) for item in cart)

    try:
        # Ensure payment and items are JSON strings
        payment_json = json.dumps(payment)
        items_json = json.dumps(cart)

        new_order = Order(
            name=name,
            payment=payment_json,  # Explicitly a string
            items=items_json,      # Explicitly a string
            total=total
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except Exception as e:
        print("Order insert error:", e)
        return jsonify({"error": str(e)}), 500

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
