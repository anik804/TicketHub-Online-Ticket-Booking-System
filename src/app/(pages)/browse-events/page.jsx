"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/event/EvantCard";
import { FaSearch } from "react-icons/fa";

export default function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/browse-event");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtered events
  const filteredEvents = events?.filter(
    (event) =>
      (event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase())) &&
      (category ? event.category === category : true)
  );

  return (
    <section className="w-full text-accent py-16 px-6 md:px-16">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl bg-gradient-to-r from-accent via-accent to-secondary w-fit mx-auto md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text">
          Browse Events
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Find the perfect event for you and your friends
        </p>
      </motion.div>

      {/* Filter Row */}
      <div className="w-full lg:w-4/5 flex flex-col md:flex-row gap-4 mb-10 mx-auto items-center">
        <div className="flex items-center w-full gap-3">
          <span className="min-w-[3rem] h-12 text-2xl border border-base-200 rounded-md shadow-sm flex items-center justify-center text-base-300 bg-base-100">
            <FaSearch />
          </span>

          <input
            type="text"
            placeholder="Search events..."
            className="flex-grow h-12 text-lg border border-base-200 rounded-md px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 text-lg border border-base-200 rounded-md px-3 shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
        >
          <option value="">All Categories</option>
          <option value="movies">Movies</option>
          <option value="concerts">Concerts</option>
          <option value="theater">Theater</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
          <option value="workshops">Workshops</option>
        </select>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="text-center text-lg font-medium">Loading events...</p>
      )}

      {/* Events Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col h-full transition-transform hover:scale-[1.02]"
                >
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-lg font-medium">
                No events found
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
