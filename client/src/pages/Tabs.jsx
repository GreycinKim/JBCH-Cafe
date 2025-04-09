import { useState } from "react";

const tabs = [
    { id: 1, name: "Greycin", price: 25 },
    { id: 2, name: "Greece", price: 30 },
];

function Tabs({ addToCart }) {
    const [addTab, setAddTab] = useState([]);
    const [boxPopup, setBoxPopup] = useState(false);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {tabs.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setAddTab((prev) => [...prev, item])}
                    className="bg-white rounded-lg shadow-md border border-gray-200 h-32 flex flex-col items-center justify-center text-lg font-medium hover:bg-cyan-100 hover:scale-105 transition-transform duration-200"
                >
                    {item.name}
                    <span className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                    </span>
                </button>
            ))}
            <button
                onClick={() => setBoxPopup(true)}
                className="bg-white rounded-lg shadow-md border border-gray-200 h-32 flex flex-col items-center justify-center text-lg font-medium hover:bg-cyan-100 hover:scale-105 transition-transform duration-200"
            >
                {boxPopup ? <input className="border p-1" /> : "+"}
            </button>
        </div>
    );
}

export default Tabs;
