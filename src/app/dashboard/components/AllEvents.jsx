"use client";

import { useEffect, useState } from "react";
import Loader from "./shared/Loader";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/all-events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updatedEvents = events;

    if (searchTerm.trim()) {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter !== "all") {
      if (priceFilter === "low") {
        updatedEvents = updatedEvents.filter((event) => event.price < 500);
      } else if (priceFilter === "mid") {
        updatedEvents = updatedEvents.filter(
          (event) => event.price >= 500 && event.price <= 1000
        );
      } else if (priceFilter === "high") {
        updatedEvents = updatedEvents.filter((event) => event.price > 1000);
      }
    }

    setFilteredEvents(updatedEvents);
  }, [searchTerm, priceFilter, events]);

  if (loading) return <Loader></Loader>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🎟️ All Events</h1>

      {/* 🔎 Search + Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="🔎 Search by event title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 flex-1 focus:ring-2 focus:ring-red-400"
        />

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-400"
        >
          <option value="all">All Prices</option>
          <option value="low">Below 500৳</option>
          <option value="mid">500৳ – 1000৳</option>
          <option value="high">Above 1000৳</option>
        </select>
      </div>

      {/* 🗂️ Events List */}
      {filteredEvents.length === 0 ? (
        <p className="text-gray-600">No events match your search or filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 p-5 h-full"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{event.eventDateTime}</p>
                <p className="mt-2 text-gray-700">{event.location}</p>
                <p className="font-bold text-red-600 mt-3 text-lg">
                  ৳{event.price}
                </p>
              </div>

              <button className="mt-5 w-full btn bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
