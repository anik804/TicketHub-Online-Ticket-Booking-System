"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/browse-event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-6">Loading event...</p>;
  if (!event) return <p className="text-center py-6">Event not found.</p>;

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
        <img
          src={event.image || "/assets/placeholder.png"}
          alt={event.title}
          className="w-full h-60 object-cover rounded-md mb-5"
        />
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-600 text-sm mb-2">{event.date}</p>
        <p className="text-lg font-medium mb-2">📍 {event.location}</p>
        <p className="text-lg text-red-600 font-bold mb-4">৳{event.price}</p>
        <p className="text-gray-700 mb-6">{event.description}</p>

        <button className="w-full px-4 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition">
          Buy Ticket
        </button>
      </div>
    </section>
  );
}
