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
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const handleExportCSV = () => {
        if (!filteredOrders.length) return;

        const headers = [
            "Order ID",
            "Name",
            "Timestamp",
            "Payment Type",
            "Total ($)",
            "Items"
        ];

        const rows = filteredOrders.map(order => {
            const itemDetails = order.items.map(item =>
                `${item.name} x${item.quantity} ($${item.price})`
            ).join(" | ");

            return [
                order.id,
                order.name,
                new Date(order.created_at).toLocaleString(),
                order.payment.type,
                order.total.toFixed(2),
                itemDetails
            ];
        });

        const csvContent = [headers, ...rows].map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        ).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `orders_${filterType}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📦 Order History</h1>

            {/* Filter and Export */}
            <div className="mb-4 flex gap-4 items-center">
                <div>
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

                <button
                    onClick={handleExportCSV}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                    Export as CSV
                </button>
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
