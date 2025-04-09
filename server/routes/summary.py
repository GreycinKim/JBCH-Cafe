from flask import Blueprint, request, jsonify
from models.order import Order
from db import db
import json
from sqlalchemy import func
from datetime import datetime, timedelta

summary_bp = Blueprint("summary", __name__, url_prefix="/api")

def parse_time_filter(time_filter):
    now = datetime.utcnow()
    if time_filter == "day":
        return now - timedelta(days=1)
    elif time_filter == "week":
        return now - timedelta(weeks=1)
    elif time_filter == "month":
        return now - timedelta(days=30)
    elif time_filter == "year":
        return now - timedelta(days=365)
    else:
        return None

@summary_bp.route("/summary", methods=["GET"])
def get_summary():
    time_filter = request.args.get("time")  # "day", "week", "month", "year"
    try:
        query = Order.query
        if time_filter:
            since = parse_time_filter(time_filter)
            if since:
                query = query.filter(Order.created_at >= since)

        orders = query.all()
        if not orders:
            return jsonify({
                "totalRevenue": 0,
                "totalOrders": 0,
                "mostPopularItem": "N/A",
                "averageOrderValue": 0,
                "paymentTotals": {
                    "Venmo": 0,
                    "Cash": 0
                }
            })

        total_revenue = sum(order.total for order in orders)
        total_orders = len(orders)
        avg_order_value = total_revenue / total_orders if total_orders else 0

        item_counts = {}
        payment_totals = {"Venmo": 0, "Cash": 0}

        for order in orders:
            items = json.loads(order.items)
            payment = json.loads(order.payment)
            for item in items:
                item_counts[item["name"]] = item_counts.get(item["name"], 0) + item["quantity"]
            pay_type = payment.get("type")
            if pay_type in payment_totals:
                payment_totals[pay_type] += order.total

        most_popular_item = max(item_counts.items(), key=lambda x: x[1])[0] if item_counts else "N/A"

        return jsonify({
            "totalRevenue": total_revenue,
            "totalOrders": total_orders,
            "mostPopularItem": most_popular_item,
            "averageOrderValue": round(avg_order_value, 2),
            "paymentTotals": payment_totals
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
