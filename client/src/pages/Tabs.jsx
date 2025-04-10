import { useEffect, useState } from "react";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;
function Tabs() {
    const [tabs, setTabs] = useState([]);
    const [newTabName, setNewTabName] = useState("");
    const [newTabPrice, setNewTabPrice] = useState("");
    const [boxPopup, setBoxPopup] = useState(false);
    const [editTabId, setEditTabId] = useState(null);
    const [editedPrice, setEditedPrice] = useState("");

    const API_URL = `${VITE_API_URL}/api/tabs`;

    // Load all tabs on mount
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setTabs(res.data);
                } else {
                    console.error("Expected array, got:", res.data);
                    setTabs([]);
                }
            })
            .catch(err => {
                console.error("Error fetching tabs:", err);
                setTabs([]);
            });
    }, []);

    // Add a new tab
    const handleAddTab = async () => {
        if (!newTabName || !newTabPrice) {
            alert("Fill out the tab first");
            return;
        }
        try {
            const res = await axios.post(API_URL, {
                name: newTabName,
                price: parseFloat(newTabPrice),
            });
            setTabs(prev => [...prev, res.data]);
            setNewTabName("");
            setNewTabPrice("");
            setBoxPopup(false);
        } catch (err) {
            console.error("Failed to add tab:", err);
        }
    };

    // Enable edit mode
    const handleEditTab = (tab) => {
        setEditTabId(tab.id);
        setEditedPrice(tab.price);
    };

    // Save edited price
    const handleSaveEdit = async (id) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, {
                price: parseFloat(editedPrice),
            });
            setTabs(prev => prev.map(tab => (tab.id === id ? res.data : tab)));
            setEditTabId(null);
        } catch (err) {
            console.error("Failed to save tab:", err);
        }
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {Array.isArray(tabs) && tabs.length > 0 ? (
                tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleEditTab(tab)}
                        className="bg-white rounded-lg shadow-md border border-gray-200 h-32 flex flex-col items-center justify-center text-lg font-medium hover:bg-cyan-100 hover:scale-105 transition-transform duration-200"
                    >
                        {tab.name}
                        {editTabId === tab.id ? (
                            <div className="flex flex-col items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    value={editedPrice}
                                    onChange={(e) => setEditedPrice(e.target.value)}
                                    className="border p-1 w-20 text-center"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent triggering parent click
                                        handleSaveEdit(tab.id);
                                    }}
                                    className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-600">
                                ${tab.price.toFixed(2)}
                            </span>
                        )}
                    </button>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-400">No tabs yet. Add one!</div>
            )}

            {/* Add Tab Button - NOT nested inside another <button> */}
            <div
                onClick={() => !boxPopup && setBoxPopup(true)}
                role="button"
                className="bg-white rounded-lg shadow-md border border-gray-200 h-32 flex flex-col items-center justify-center text-lg font-medium hover:bg-cyan-100 hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
                {boxPopup ? (
                    <div className="flex flex-col gap-2">
                        <input
                            value={newTabName}
                            onChange={(e) => setNewTabName(e.target.value)}
                            placeholder="Name"
                            className="border p-1"
                        />
                        <input
                            value={newTabPrice}
                            onChange={(e) => setNewTabPrice(e.target.value)}
                            placeholder="Tab Amount"
                            type="number"
                            className="border p-1"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // prevent form collapsing
                                handleAddTab();
                            }}
                            className="bg-green-500 text-white p-1 rounded"
                        >
                            Add it, now!
                        </button>
                    </div>
                ) : (
                    "+"
                )}
            </div>
        </div>
    );
}

export default Tabs;
