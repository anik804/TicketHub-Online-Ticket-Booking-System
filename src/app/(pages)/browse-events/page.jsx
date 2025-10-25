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

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Filtering
  const filteredEvents = events?.filter((event) => {
    const titleMatch = event.title.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = event.category.toLowerCase().includes(search.toLowerCase());
    const categoryFilter = category ? event.category.toLowerCase() === category.toLowerCase() : true;
    return (titleMatch || categoryMatch) && categoryFilter;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: "smooth" }); // smooth scroll up on page change
    }
  };

  return (
    <section className="w-full text-accent py-16">
      {/* Hero Banner */}
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
          <p className="text-gray-300 mb-2">Home / Browse Events</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Browse Events</h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl mt-10 bg-gradient-to-r from-accent via-accent to-secondary w-fit mx-auto md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text">
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="h-12 text-lg border border-base-200 rounded-md px-3 shadow-sm w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
        >
          <option value="">Select Category</option>
          <option value="Concert">Concert 🎵</option>
          <option value="Sports">Sports 🏀</option>
          <option value="Workshop">Workshop 🛠️</option>
          <option value="Exhibition / Fair">Exhibition / Fair 🎨</option>
          <option value="Festival / Cultural Event">Festival / Cultural Event 🎭</option>
          <option value="Competition / Contest">Competition / Contest 🏆</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-lg font-medium">Loading events...</p>}

      {/* Events Grid */}
      {!loading && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => (
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md hover:bg-secondary hover:text-white transition disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary/20"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md hover:bg-secondary hover:text-white transition disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
