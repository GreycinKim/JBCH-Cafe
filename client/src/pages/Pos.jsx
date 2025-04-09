import { useState } from "react";
import MenuItem from "../components/MenuItem";
import Cart from "../components/Cart";

function Pos() {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/4 p-4">
                <MenuItem addToCart={addToCart} />
            </div>
            <div className="w-1/4 p-4 bg-gray-100 shadow-lg border border-cyan-100 rounded-lg">
                <Cart cart={cart} setCart={setCart} />
            </div>
        </div>
    );
}

export default Pos;
