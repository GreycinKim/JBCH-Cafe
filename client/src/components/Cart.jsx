import { useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function Cart({ cart, setCart }) {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [showAddTab, setShowAddTab] = useState(false);
    const [fundsName, setFundsName] = useState("");
    const [fundsAmount, setFundsAmount] = useState("");

    const removeItem = (itemId) => {
        setCart(cart.filter((item) => item.id !== itemId));
    };

    return (
        <section className="p-4">
            <h2 className="text-xl font-bold mb-2">Cart</h2>
            <ul className="space-y-2">
                {cart.length === 0 ? (
                    <li className="text-gray-500">Your cart is empty.</li>
                ) : (
                    cart.map((item, index) => (
                        <li
                            key={`${item.id}-${index}`}
                            className="bg-white p-2 rounded shadow border text-gray-800 flex justify-between items-center"
                        >
                            <span>
                                {item.name} (x{item.quantity})
                            </span>
                            <div className="flex items-center">
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            <p className="mt-4 font-semibold text-right">Total: ${total.toFixed(2)}</p>

            <div className="flex justify-between items-center mt-4">
                {/* Add to Tab Button */}
                <button
                    onClick={() => setShowAddTab(true)}
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
                >
                    Add to Tab
                </button>

                {/* Pay Now Button */}
                <SubmitButton cart={cart} setCart={setCart} />
            </div>

            {/* Add to Tab Popup */}
            {showAddTab && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-80 relative">
                        <button
                            onClick={() => setShowAddTab(false)}
                            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                        >
                            ×
                        </button>

                        <h2 className="text-lg font-bold mb-4">Add Funds to Tab</h2>

                        <input
                            placeholder="Name"
                            value={fundsName}
                            onChange={(e) => setFundsName(e.target.value)}
                            className="border w-full p-2 mb-2"
                        />

                        <input
                            placeholder="Amount"
                            type="number"
                            value={fundsAmount}
                            onChange={(e) => setFundsAmount(e.target.value)}
                            className="border w-full p-2 mb-4"
                        />

                        <button
                            onClick={async () => {
                                try {
                                    const res = await axios.patch(
                                        `${VITE_API_URL}/api/tabs/add/${fundsName}`,
                                        { amount: parseFloat(fundsAmount) }
                                    );

                                    alert("Funds added!");
                                    setShowAddTab(false);
                                    setFundsName("");
                                    setFundsAmount("");
                                } catch (err) {
                                    alert("Error adding funds: " + (err.response?.data?.error || err.message));
                                }
                            }}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Confirm Add
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Cart;
