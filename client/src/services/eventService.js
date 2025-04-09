const BASE_URL = 'http://localhost:5000';

export async function fetchEvents(setEvents) {
    try {
        const res = await fetch(`${BASE_URL}/events`);
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
        await fetch(`${BASE_URL}/events`, {
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
