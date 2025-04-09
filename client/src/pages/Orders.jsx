import { useEffect, useState } from "react";
import {getOrders} from "../services/orderService.js";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📦 Order History</h1>
            <div className="grid gap-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white p-4 rounded shadow border"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                🧾 Order #{order.id} — {order.name}
                            </h2>
                            <span className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleString()}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-600">
                            💳 Payment: <strong>{order.payment.type}</strong>
                        </p>
                        <p className="mt-2 text-gray-600">
                            💰 Total: ${order.total.toFixed(2)}
                        </p>
                        <ul className="mt-2 pl-4 list-disc text-sm text-gray-700">
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    {item.name} x{item.quantity} — ${item.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
