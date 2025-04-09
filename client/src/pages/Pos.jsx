import { useState, useEffect } from "react";
import MenuItem from "../components/MenuItem";
import Cart from "../components/Cart";
import { getOrders } from "../services/orderService";

function Pos() {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

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
        <div className="flex h-screen">
            <div className="w-3/4 p-4">
                <h1 className="text-2xl font-bold mb-4">La Caf&eacute; POS</h1>
                <MenuItem addToCart={addToCart} />
            </div>
            <div className="w-1/4 p-4 bg-gray-100 shadow-lg border border-cyan-100 rounded-lg">
                <Cart cart={cart} setCart={setCart} />
            </div>
        </div>
    );
}

export default Pos;