"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <motion.div
      className="relative border border-base-300 rounded-lg shadow-md hover:shadow-lg overflow-hidden bg-base-200 flex flex-col cursor-pointer group"
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
        <p className="text-sm flex items-center gap-2"><MdDateRange /> {event.date}</p>
        <p className="text-sm flex items-center gap-2"><FaLocationDot />{event.location}</p>
        <p className="mt-3  mb-5   flex items-center gap-2 text-2xl text-shadow font-bold text-secondary "><HiOutlineCurrencyBangladeshi /> BDT {event.price}</p>
        <span className="absolute top-2 right-2 mt-auto inline-block text-xs px-2 py-1 bg-amber-200 border border-amber-300 text-secondary rounded-md w-fit">
          {event.category}
        </span>

        {/* <button className="absolute bottom-2 right-2 btn btn-ghost mt-auto inline-block text-xs px-2 py-1 bg-base-200 text-secondary rounded-md w-fit">
          View Details
        </button> */}
        <Link
          href={`/browse-events/${event._id}`}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
