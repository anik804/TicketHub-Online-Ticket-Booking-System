"use client";

import { useEffect, useState } from "react";

export default function AdminEventsPage() {
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

  // 🔎 Handle search and filter logic
  useEffect(() => {
    let updatedEvents = events;

    // Filter by search keyword
    if (searchTerm.trim()) {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
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

  if (loading) return <p className="text-center py-6">Loading events...</p>;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎟️ All Events</h1>

      {/* 🔎 Search + Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔎 Search by event title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 flex-1 focus:ring-2 focus:ring-red-400"
        />

        {/* Price Filter */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 text-sm">{event.date}</p>
              <p className="mt-2">{event.location}</p>
              <p className="font-bold text-red-600 mt-2">৳{event.price}</p>
              <button className="mt-3 px-4 btn py-2 bg-red-600 text-white rounded hover:bg-red-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
