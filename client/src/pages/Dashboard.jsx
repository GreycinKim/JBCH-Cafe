import { useEffect, useState } from "react";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [filter, setFilter] = useState("");
    const API_BASE_URL = `${VITE_API_URL}/api/summary`;

    const fetchSummary = async () => {
        try {
            const res = await axios.get(API_BASE_URL, {
                params: filter ? { time: filter } : {},
            });
            setSummary(res.data);
        } catch (err) {
            console.error("Failed to fetch summary:", err);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [filter]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border px-2 py-1 rounded"
                >
                    <option value="">All</option>
                    <option value="day">Past Day</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                </select>
            </div>

            {summary && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 shadow rounded text-center">
                            <p className="text-sm text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold">
                                ${summary.totalRevenue ? summary.totalRevenue.toFixed(2) : "0.00"}
                            </p>
                        </div>
                        <div className="bg-white p-4 shadow rounded text-center">
                            <p className="text-sm text-gray-500">Revenue by Payment</p>
                            <p className="text-sm mt-2">
                                💸 Venmo: $
                                {summary.paymentTotals?.Venmo ? summary.paymentTotals.Venmo.toFixed(2) : "0.00"}
                            </p>
                            <p className="text-sm">
                                💵 Cash: $
                                {summary.paymentTotals?.Cash ? summary.paymentTotals.Cash.toFixed(2) : "0.00"}
                            </p>
                            <p className="text-sm">
                                📑 Tab: $
                                {summary.paymentTotals?.Tab ? summary.paymentTotals.Tab.toFixed(2) : "0.00"}
                            </p>
                        </div>
                        <div className="bg-white p-4 shadow rounded text-center">
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold">{summary.totalOrders || 0}</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded text-center">
                            <p className="text-sm text-gray-500">Popular Item</p>
                            <p className="text-xl font-semibold">{summary.mostPopularItem || "N/A"}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
