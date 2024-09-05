import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

// Set up the localizer
const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axios.get("/api/availability", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Convert the fetched availability into the format required by react-big-calendar
        const formattedEvents = data.map(slot => ({
          title: 'Available',
          start: new Date(slot.start),
          end: new Date(slot.end)
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-7">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Availability</h2>
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <div className="p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, borderRadius: '0.5rem' }}
            views={['month', 'week', 'day']}
            defaultView="month"
            components={{
              event: ({ event }) => (
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  {event.title}
                </div>
              )
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
