"use client";

import { useEffect, useState } from "react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/all-events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-6">Loading events...</p>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎟️ All Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="mt-2">{event.location}</p>
              <p className="font-bold text-red-600 mt-2">৳{event.price}</p>
              <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
