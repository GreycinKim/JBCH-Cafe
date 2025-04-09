import SubmitButton from "./SubmitButton";

function Cart({ cart, setCart }) {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                            key={`${item.id}-${index}`} // Unique key for duplicates
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
            <div className="flex justify-end mt-4">
                <SubmitButton cart={cart} setCart={setCart} />
            </div>
        </section>
    );
}

export default Cart;