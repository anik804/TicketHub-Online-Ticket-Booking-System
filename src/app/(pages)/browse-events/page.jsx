"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EventCard from "@/components/event/EvantCard";

export default function BrowseEvents() {
  // Dummy event data (16 events)
  const dummyEvents = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2025-10-20",
      location: "Dhaka, Bangladesh",
      price: 1200,
      category: "Concert",
      image: "",
    },
    {
      id: 2,
      title: "Tech Expo 2025",
      date: "2025-11-05",
      location: "Chittagong, Bangladesh",
      price: 800,
      category: "Expo",
      image: "",
    },
    {
      id: 3,
      title: "Food Carnival",
      date: "2025-10-25",
      location: "Sylhet, Bangladesh",
      price: 500,
      category: "Festival",
      image: "",
    },
    {
      id: 4,
      title: "Comedy Night",
      date: "2025-12-01",
      location: "Dhaka, Bangladesh",
      price: 700,
      category: "Show",
      image: "",
    },
    {
      id: 5,
      title: "Cricket World Cup Warm-up",
      date: "2025-10-18",
      location: "Chittagong Stadium",
      price: 1500,
      category: "Sports",
      image: "",
    },
    {
      id: 6,
      title: "Art & Culture Expo",
      date: "2025-09-30",
      location: "Dhaka Museum",
      price: 600,
      category: "Expo",
      image: "",
    },
    {
      id: 7,
      title: "Rock Night Live",
      date: "2025-10-12",
      location: "Sylhet Arena",
      price: 2000,
      category: "Concert",
      image: "",
    },
    {
      id: 8,
      title: "Startup Pitch Fest",
      date: "2025-11-22",
      location: "Dhaka Innovation Hub",
      price: 1000,
      category: "Business",
      image: "",
    },
    {
      id: 9,
      title: "International Dance Fest",
      date: "2025-12-15",
      location: "Chittagong Hall",
      price: 900,
      category: "Show",
      image: "",
    },
    {
      id: 10,
      title: "Gaming Convention",
      date: "2025-11-01",
      location: "Dhaka Expo Center",
      price: 750,
      category: "Expo",
      image: "",
    },
    {
      id: 11,
      title: "Classical Music Evening",
      date: "2025-09-28",
      location: "Dhaka Opera House",
      price: 1100,
      category: "Concert",
      image: "",
    },
    {
      id: 12,
      title: "Bangladesh vs India Football",
      date: "2025-10-10",
      location: "Sylhet Stadium",
      price: 1800,
      category: "Sports",
      image: "",
    },
    {
      id: 13,
      title: "Book Fair 2025",
      date: "2025-12-20",
      location: "Dhaka Book City",
      price: 300,
      category: "Festival",
      image: "",
    },
    {
      id: 14,
      title: "Fashion Week Dhaka",
      date: "2025-11-15",
      location: "Dhaka Expo Center",
      price: 2200,
      category: "Show",
      image: "",
    },
    {
      id: 15,
      title: "Stand-up Night Special",
      date: "2025-09-25",
      location: "Chittagong Club",
      price: 650,
      category: "Show",
      image: "https://images.unsplash.com/400x300/?standup,comedy",
    },
    {
      id: 16,
      title: "Science Fair",
      date: "2025-10-05",
      location: "Dhaka Science Museum",
      price: 400,
      category: "Expo",
      image: "https://images.unsplash.com/400x300/?science,technology",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Filtered events
  const filteredEvents = dummyEvents.filter(
    (event) =>
      (event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())) &&
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
        <h1 className="text-4xl text-accent md:text-5xl font-extrabold mb-3">
          Browse Events
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Find the perfect event for you and your friends
        </p>
      </motion.div>

      {/* Filter Row */}
      <div className="w-full lg:w-4/5 flex flex-col md:flex-row gap-6 mb-10 mx-auto">
        <input
          type="text"
          placeholder="Search events..."
          className="flex-2 h-12 text-lg border border-accent/30 rounded-sm p-3 w-full shadow-sm focus-within:outline-0 focus-within:shadow-md focus-within:border-secondary/50 focus-within:scale-104 custom-transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg select h-12 text-lg flex-1 border border-accent/30 p-3 w-full shadow-sm focus-within:outline-0 focus-within:shadow-md focus-within:border-secondary/50 custom-transition"
        >
          <option value="">All Categories</option>
          <option>Concert</option>
          <option>Sports</option>
          <option>Expo</option>
          <option>Festival</option>
          <option>Show</option>
          <option>Business</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
