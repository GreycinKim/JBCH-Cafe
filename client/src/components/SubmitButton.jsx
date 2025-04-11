import { useState } from "react";
import { createOrder } from "../services/orderService";
const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

function SubmitButton({ cart, setCart }) {
    const [showPopup, setShowPopup] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async (method) => {
        if (!cart || cart.length === 0) {
            alert("Cart is empty.");
            return;
        }

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setIsLoading(true);

        try {
            // Step 1: If Tab, update backend tab before order
            if (method === "Tab") {
                try {
                    const res = await axios.patch(`${VITE_API_URL}/api/tabs/use/${customerName}`, {
                        amount: total
                    });

                    if (res.status === 200) {
                        console.log("Tab updated or cleared.");
                    }
                } catch (err) {
                    if (err.response && err.response.status === 400) {
                        alert(`Insufficient funds on tab. Current balance: $${err.response.data.current_balance.toFixed(2)}`);
                        setIsLoading(false);
                        return;
                    } else {
                        alert("Tab error: " + err.message);
                        setIsLoading(false);
                        return;
                    }
                }
            }

            // Step 2: Create the order
            const result = await createOrder({
                name: customerName?.trim() || "Guest",
                cart: [...cart],
                payment: { type: method },
            });

            console.log("Order submitted:", result);
            setCart([]);
            setCustomerName("");
            setShowPopup(false);
        } catch (error) {
            alert("Failed to submit order: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowPopup(true)}
                disabled={isLoading}
                className="py-2 px-4 rounded shadow font-semibold transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400"
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            disabled={isLoading}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            ×
                        </button>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1">Name</label>
                            <input
                                type="text"
                                autoFocus={true}
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Customer name"
                                className="w-full px-3 py-2 border rounded"
                                disabled={isLoading}
                            />
                        </div>

                        <h2 className="text-xl font-bold mb-4">Select Payment Type</h2>

                        <div className="flex justify-around space-x-2">
                            {["Venmo", "Cash", "Tab"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => handlePayment(method)}
                                    disabled={isLoading}
                                    className={`${
                                        method === "Venmo"
                                            ? "bg-blue-500 hover:bg-blue-400 border-blue-700 hover:border-blue-500"
                                            : method === "Cash"
                                                ? "bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500"
                                                : "bg-purple-500 hover:bg-purple-400 border-purple-700 hover:border-purple-500"
                                    } text-white font-bold py-2 px-4 border-b-4 rounded disabled:bg-gray-400`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SubmitButton;