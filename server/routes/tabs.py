from flask import Blueprint, request, jsonify
from models.tab import Tab
from db import db

tabs_bp = Blueprint('tabs', __name__, url_prefix="/api/tabs")

# Get all tabs
@tabs_bp.route('', methods=['GET'])
def get_tabs():
    try:
        tabs = Tab.query.all()
        return jsonify([tab.to_dict() for tab in tabs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Create a new tab
@tabs_bp.route('', methods=['POST'])
def create_tab():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")

    if not name or price is None:
        return jsonify({"error": "Name and price required"}), 400

    try:
        new_tab = Tab(name=name, price=float(price))
        db.session.add(new_tab)
        db.session.commit()
        return jsonify(new_tab.to_dict()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update an existing tab (price)
@tabs_bp.route('/<int:tab_id>', methods=['PUT'])
def update_tab(tab_id):
    data = request.get_json()
    new_price = data.get("price")

    try:
        tab = Tab.query.get(tab_id)
        if not tab:
            return jsonify({"error": "Tab not found"}), 404

        if new_price is not None:
            tab.price = float(new_price)
            db.session.commit()

        return jsonify(tab.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: Delete a tab
@tabs_bp.route('/<int:tab_id>', methods=['DELETE'])
def delete_tab(tab_id):
    try:
        tab = Tab.query.get(tab_id)
        if not tab:
            return jsonify({"error": "Tab not found"}), 404

        db.session.delete(tab)
        db.session.commit()
        return jsonify({"message": "Tab deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
