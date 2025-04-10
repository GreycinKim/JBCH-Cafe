const VITE_API_URL = import.meta.env.VITE_API_URL;

const API_BASE_URL = `${VITE_API_URL}`;
export async function fetchEvents(setEvents) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        const data = await res.json();

        if (Array.isArray(data)) {
            const formatted = data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
            }));
            setEvents(formatted);
        } else {
            console.error("Expected array but got:", data);
            setEvents([]);
        }
    } catch (err) {
        console.error("❌ Error fetching events:", err.message);
        setEvents([]);
    }
}

export async function saveEvent(event) {
    try {
        await fetch(`${API_BASE_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });
    } catch (err) {
        console.error("❌ Error saving event:", err.message);
    }
}
