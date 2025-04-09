import { useState } from "react";
import { createOrder } from "../services/orderService";

function SubmitButton({ cart, setCart }) {
    const [showPopup, setShowPopup] = useState(false);
    const [customerName, setCustomerName] = useState("");

    const handlePayment = async (method) => {
        if (!cart || cart.length === 0) {
            alert("Cart is empty.");
            return;
        }

        if (!method) {
            alert("Please select a payment method.");
            return;
        }

        try {
            const result = await createOrder({
                name: customerName?.trim() || "Guest",
                cart: [...cart], // Ensure it's a real array copy
                payment: { type: method }, // wrap as object if backend expects it
            });

            console.log("Order submitted:", result);
            setCart([]);
            setCustomerName("");
            setShowPopup(false);
        } catch (error) {
            alert("Failed to submit order: " + error.message);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowPopup(true)}
                className="py-2 px-4 rounded shadow font-semibold transition-colors duration-200 bg-blue-500 hover:bg-blue-600 text-white"
            >
                Pay Now
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            &times;
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
                            />
                        </div>

                        <h2 className="text-xl font-bold mb-4">Select Payment Type</h2>

                        <div className="flex justify-around space-x-2">
                            {["Venmo", "Cash", "Tab"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => handlePayment(method)}
                                    className={`${
                                        method === "Venmo"
                                            ? "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                            : method === "Cash"
                                                ? "bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
                                                : "bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                                    } text-white px-4 py-2 rounded`}
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
