const VITE_API_URL = import.meta.env.VITE_API_URL;

const API_URL = `${VITE_API_URL}/api/orders`;

export const createOrder = async ({ name, cart, payment }) => {
    try {
        if (!cart || cart.length === 0) {
            throw new Error("Cart is empty or missing");
        }
        if (!payment || !payment.type) {
            throw new Error("Payment info is missing or invalid");
        }

        const payload = { name, cart, payment };
        console.log("Sending order:", payload);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Order failed");
        return data; // Expecting full order object
    } catch (err) {
        console.error("createOrder error:", err.message);
        throw err;
    }
};

export const getOrders = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to fetch orders");
        return data; // Expecting array of orders
    } catch (err) {
        console.error("getOrders error:", err.message);
        throw err;
    }
};