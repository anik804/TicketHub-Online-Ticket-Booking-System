"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:3000/api/events?organizerEmail=123");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading events...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Events</h1>

      {events.length === 0 ? (
        <p className="text-gray-600">You haven’t added any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={event.imageUrl || "/events/placeholder.jpg"}
                alt={event.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="text-sm">{event.location}</p>
              <p className="mt-1 font-semibold text-red-600">৳{event.price}</p>

              <div className="flex justify-between mt-3">
                <Link
                  href={`/dashboard/organizer/events/${event._id}`}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
                <Link
                  href={`/dashboard/organizer/events/${event._id}/edit`}
                  className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
