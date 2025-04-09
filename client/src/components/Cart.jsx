import SubmitButton from "./SubmitButton";

function Cart({ cart, setCart }) {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <section className="p-4">
            <h2 className="text-xl font-bold mb-2">Cart</h2>
            <ul className="space-y-2">
                {cart.length === 0 ? (
                    <li className="text-gray-500">Your cart is empty.</li>
                ) : (
                    cart.map((item, index) => (
                        <li
                            key={index}
                            className="bg-white p-2 rounded shadow border text-gray-800 flex justify-between"
                        >
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
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
