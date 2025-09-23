"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ManageEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/organizer/events?email=${session.user.email}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  // Update event (seats, price, discount)
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch("/api/organizer/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, ...updates }),
      });
      const data = await res.json();
      setEvents(events.map(e => e._id === id ? data : e));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/organizer/delete?eventId=${id}`, { method: "DELETE" });
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Manage Your Events</h2>
      {events.length === 0 && <p>No events found.</p>}

      <div className="space-y-4">
        {events.map(event => (
          <div key={event._id} className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p>Seats: {event.availableSeats}/{event.totalSeats}</p>
              <p>Price: ${event.price} | Discount: {event.discount}%</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => handleUpdate(event._id, { totalSeats: event.totalSeats + 5 })}
              >
                +5 Seats
              </button>
              <button
                className="px-3 py-1 bg-yellow-500 text-black rounded"
                onClick={() => {
                  const newPrice = parseFloat(prompt("New price:", event.price));
                  if (!isNaN(newPrice)) handleUpdate(event._id, { price: newPrice });
                }}
              >
                Edit Price
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
