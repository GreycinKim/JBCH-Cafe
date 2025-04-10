import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import ICAL from 'ical.js';
import { fetchEvents, saveEvent } from '../services/eventService';

function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [calendarView, setCalendarView] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        fetchEvents(setEvents);
    }, []);

    const locales = { 'en-US': enUS };
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const icsText = event.target.result;

            try {
                const jcalData = ICAL.parse(icsText);
                const comp = new ICAL.Component(jcalData);
                const vevents = comp.getAllSubcomponents('vevent');

                const parsedEvents = vevents.map((vevent) => {
                    const event = new ICAL.Event(vevent);
                    return {
                        title: event.summary,
                        start: event.startDate.toJSDate().toISOString(),
                        end: event.endDate.toJSDate().toISOString(),
                    };
                });

                await Promise.all(parsedEvents.map(saveEvent));
                await fetchEvents(setEvents);
                console.log("✅ Events uploaded and saved.");
            } catch (error) {
                console.error("❌ Failed to parse ICS file:", error);
            }
        };

        reader.readAsText(file);
    }

    return (
        <div className="calendar-wrapper" >
            <div className="calendar-container">
                <div className="calendar-controls flex items-center justify-between px-6 py-4">
                    <h2 className="text-2xl font-semibold text-gray-700">🗓 JBCH Cafe Calendar</h2>

                    <input
                        type="file"
                        accept=".ics"
                        onChange={handleFileUpload}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
                    />
                </div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'week', 'day', 'agenda']}
                    view={calendarView}
                    onView={(view) => setCalendarView(view)}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    eventPropGetter={() => ({
                        style: {
                            backgroundColor: '#005599',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '2px 6px',
                            border: 'none',
                        },
                    })}
                    style={{
                        height: '85vh',
                        margin: '0 auto',
                        width: '95%',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '12px',
                    }}
                />
            </div>
        </div>
    );
}

export default CalendarPage;
