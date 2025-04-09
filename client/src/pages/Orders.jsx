import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService.js";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filterType, setFilterType] = useState("all");

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

    const filteredOrders = orders
        .filter(order => {
            if (filterType === "all") return true;
            return order.payment.type.toLowerCase() === filterType;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // sort by most recent

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📦 Order History</h1>

            {/* Filter */}
            <div className="mb-4">
                <label className="text-gray-700 font-medium mr-2">Filter by payment:</label>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border px-3 py-1 rounded"
                >
                    <option value="all">All</option>
                    <option value="cash">Cash</option>
                    <option value="venmo">Venmo</option>
                    <option value="tab">Tab</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="grid gap-4">
                {filteredOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white p-4 rounded shadow border"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                🧾 Order #{order.id} — {order.name}
                            </h2>
                            <span className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleString('en-US', {
                                    timeZoneName: 'short'
                                })}
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
