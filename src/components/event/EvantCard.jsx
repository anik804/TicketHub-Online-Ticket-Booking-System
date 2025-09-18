"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  return (
    <motion.div
      className="relative border border-gray-300 rounded-xl shadow-md hover:shadow-lg overflow-hidden bg-white flex flex-col cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image || "./images/placeholder-image.svg"}
          alt={event.title}
          fill
          className="object-cover overflow-hidden group-hover:scale-120 custom-transition"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{event.title}</h2>
        <p className="text-sm text-gray-600">{event.date}</p>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="my-2 text-xl font-bold text-secondary">৳{event.price}</p>
        <span className="absolute top-2 left-2 mt-auto inline-block text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-md w-fit">
          {event.category}
        </span>
      </div>
    </motion.div>
  );
}
