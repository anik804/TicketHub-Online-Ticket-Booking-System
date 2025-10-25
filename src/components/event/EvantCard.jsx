"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg border border-gray-200 group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🎬 Event Image */}
      <div className="relative h-[275px] w-full overflow-hidden">
        <Image
          src={event.imageUrl || "/images/placeholder-image.svg"}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />

        {/* 🔥 Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* 🏷️ Category Badge */}
        <span className="absolute top-3 left-3 bg-amber-300 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {event.category}
        </span>

        {/* 🎟️ Text Content Over Image */}
        <div className="absolute bottom-0 left-0 w-full text-white p-4">
          <p className="text-sm opacity-80">
            {event.category} 
          </p>
          <h2 className="text-lg font-bold">{event.title}</h2>

{/* // • {event.duration || "180 Mins"} */}

          {/* 🎫 Get Ticket Button */}
          <Link
            href={`/browse-events/${event._id}`}
            className="mt-3 inline-block bg-white text-black font-medium px-5 py-2 rounded-sm hover:bg-orange-500 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
