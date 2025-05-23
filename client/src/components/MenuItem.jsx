const boxItems = [
    { id: 1, name: "Americano", price: 2 },
    { id: 2, name: "Latte", price: 3 },
    { id: 3, name: "Vanilla Latte", price: 3 },
    { id: 4, name: "Hazelnut Latte", price: 3 },
    { id: 5, name: "Caramel Macchiato", price: 3 },
    { id: 6, name: "Shaken Espresso", price: 3 },
    { id: 7, name: "Yuzu Tea", price: 2 },
    { id: 8, name: "Grapefruit Tea", price: 2 },
    { id: 9, name: "Hot Chocolate", price: 2 },
    { id: 10, name: "Milk Tea", price: 3 },
    { id: 11, name: "Matcha", price: 3 },
    { id: 12, name: "Mango Lemonade", price: 3 },
    { id: 13, name: "Strawberry Lemonade", price: 3 },
    { id: 14, name: "Peach Lemonade", price: 3 },
    { id: 15, name: "Banana Latte", price: 3 },
    { id: 16, name: "Strawberry Milk", price: 3 },
    { id: 17, name: "Add Shot", price: 1 },
    { id: 18, name: "Alt Milk", price: 1 }
];

function MenuItem({ addToCart }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {boxItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="bg-white rounded-lg shadow-md border border-gray-200 h-32 flex flex-col items-center justify-center text-lg font-medium hover:bg-cyan-100 hover:scale-105 transition-transform duration-200"
                >
                    {item.name}
                    <span className="text-sm text-gray-600">${item.price.toFixed(2)}</span>
                </button>
            ))}
        </div>
    );
}

export default MenuItem;