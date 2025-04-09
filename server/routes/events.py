from flask import Blueprint, request, jsonify
from models.event import Event
from db import db

events_bp = Blueprint('events', __name__)

# GET all events or POST a new event
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


# Optional: DELETE by ID (no role check)
@events_bp.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404

    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully."}), 200
