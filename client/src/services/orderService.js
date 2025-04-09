const API_URL = "http://localhost:5000/api/orders";

export const createOrder = async ({ name, cart, payment }) => {
    try {
        // Validate inputs before sending
        if (!cart || cart.length === 0) {
            throw new Error("Cart is empty or missing");
        }
        if (!payment || !payment.type) {
            throw new Error("Payment info is missing or invalid");
        }

        const payload = { name, cart, payment };
        console.log("Sending order:", payload); // Debug log

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Order failed");
        return data;
    } catch (err) {
        console.error("createOrder error:", err.message);
        throw err;
    }
};

export const getOrders = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("getOrders error:", err.message);
        throw err;
    }
};
