"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

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

  if (loading)
    return <p className="text-center mt-25 py-6">Loading event...</p>;
  if (!event) return <p className="text-center py-6">Event not found.</p>;

  // Helper functions for MongoDB fields
  const getNumber = (field) =>
    field?.$numberInt ? parseInt(field.$numberInt) : field || 0;

  return (
    <section className="mt-20">
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center mt-[-80px]"
        style={{
          backgroundImage: "url('/contact.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-gray-300 mb-2">
            Home / Browse Events / {event.title}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {event.title}
          </h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="flex flex-col md:flex-row bg-gradient-to-b from-white via-[#fffaf8] to-[#fff2e5] border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Left Side - Event Image */}
          <div className="relative w-full md:w-1/2 h-72 md:h-auto overflow-hidden">
            <img
              src={event.imageUrl || "/assets/placeholder.png"}
              alt={event.title}
              className="w-full h-90 object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <span className="absolute top-3 left-3 bg-white/90 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {event.category || "Event"}
            </span>
          </div>

          {/* Right Side - Event Details */}
          <div className="p-8 flex flex-col justify-center md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              {event.title}
            </h1>

            {/* Date, Location, Time */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 4h10M5 11h14m-9 4h4m-8 4h12"
                  />
                </svg>
                {new Date(event.eventDateTime).toLocaleDateString("en-BD", {
                  dateStyle: "medium",
                })}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 20a8 8 0 100-16 8 8 0 000 16zm.707-11.707a1 1 0 00-1.414 0L7 10.586V14a1 1 0 001 1h1a1 1 0 001-1v-1h2a1 1 0 001-1V9a1 1 0 00-1-1h-1.293l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {event.location}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 text-orange-500"
                >
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
                {new Date(event.eventDateTime).toLocaleTimeString("en-BD", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-5">
              {event.desc || "No description available for this event."}
            </p>

            {/* Price, Seats, Discount */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-white rounded-xl shadow-sm border text-center">
                <p className="text-gray-500 text-sm">Price</p>
                <p className="text-2xl font-extrabold text-orange-600">
                  ৳{Number(event.price)}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm border text-center">
                <p className="text-gray-500 text-sm">Seats</p>
                <p className="font-semibold text-gray-700">
                  {event.availableSeats} / {event.totalSeats}
                </p>
              </div>
              {event.discount > 0 && (
                <div className="p-3 bg-white rounded-xl shadow-sm border text-center">
                  <p className="text-gray-500 text-sm">Discount</p>
                  <p className="font-semibold text-red-500">
                    {event.discount}%
                  </p>
                </div>
              )}
            </div>

            {/* Buy Button */}
            <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300">
              Buy Ticket 🎫
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
