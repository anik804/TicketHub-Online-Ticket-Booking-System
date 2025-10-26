// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
// import { MdDateRange } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";
// import Link from "next/link";

// export default function EventDetailsPage() {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/events/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEvent(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch event:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="text-center py-10 text-lg">Loading event...</p>;
//   if (!event) return <p className="text-center py-10">Event not found.</p>;

//   return (
//     <section className="max-w-6xl mx-auto p-6">
//       {/* 🔹 Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold">{event.title}</h1>
//           <p className="text-gray-500">
//             {event.category} / {event.duration || "180 Mins"}
//           </p>
//         </div>
//         <Link
//           href="#"
//           className="mt-3 md:mt-0 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition"
//         >
//           View Details
//         </Link>
//       </div>

//       {/* 🔹 Poster & Trailer Section */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         {/* Poster */}
//         <div className="relative h-80 w-full">
//           <Image
//             src={event.imageUrl || "/images/placeholder-image.svg"}
//             alt={event.title}
//             fill
//             className="object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Trailer / Secondary Image */}
//         <div className="relative h-80 w-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
//           <Image
//             src={event.trailerImage || "/images/placeholder-trailer.jpg"}
//             alt="Trailer"
//             fill
//             className="object-cover opacity-80"
//           />
//           <button className="absolute flex items-center justify-center bg-white/80 rounded-full w-16 h-16 hover:scale-110 transition">
//             ▶
//           </button>
//           <p className="absolute bottom-3 text-white font-medium drop-shadow-lg">Watch the Trailer</p>
//         </div>
//       </div>

//       {/* 🔹 Info Section */}
//       <div className="grid md:grid-cols-5 gap-4 mb-10 text-sm text-gray-700">
//         <div>
//           <p className="font-semibold">Director:</p>
//           <p>{event.director || "N/A"}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Writer:</p>
//           <p>{event.writer || "N/A"}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Release Date:</p>
//           <p>{new Date(event.date).toLocaleDateString()}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Duration:</p>
//           <p>{event.duration || "180 Mins"}</p>
//         </div>
//         <div>
//           <p className="font-semibold">Rating:</p>
//           <p>{event.rating || "PG-13"}</p>
//         </div>
//       </div>

//       {/* 🔹 Top Cast Section */}
//       <div className="mb-10">
//         <h2 className="text-xl font-bold mb-4">Top Cast</h2>
//         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
//           {(event.cast || []).map((actor, i) => (
//             <div key={i} className="text-center">
//               <Image
//                 src={actor.image || "/images/avatar-placeholder.png"}
//                 alt={actor.name}
//                 width={80}
//                 height={80}
//                 className="rounded-full mx-auto mb-2 object-cover"
//               />
//               <p className="text-sm font-medium">{actor.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 Storyline */}
//       <div className="mb-10">
//         <h2 className="text-xl font-bold mb-3">Story Line</h2>
//         <p className="text-gray-700 leading-relaxed">{event.desc}</p>
//       </div>

//       {/* 🔹 Related Movies / Events */}
//       <div>
//         <h2 className="text-xl font-bold mb-3">More Movies Like This</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {(event.related || []).map((rel, i) => (
//             <div key={i} className="relative h-40 w-full overflow-hidden rounded-lg">
//               <Image
//                 src={rel.image || "/images/placeholder-image.svg"}
//                 alt={rel.title}
//                 fill
//                 className="object-cover hover:scale-105 transition-transform"
//               />
//               <div className="absolute inset-0 bg-black/40 flex items-end">
//                 <p className="text-white text-sm p-2 font-semibold">{rel.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

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

  if (loading) return <p className="text-center py-6">Loading event...</p>;
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
          <p className="text-gray-300 mb-2">Home / Browse Events / Event Details</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Event Details</h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

      <div className="relative mt-10 bg-gradient-to-b from-white via-[#fffaf8] to-[#fff2e5] border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Event Image */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={event.imageUrl || "/assets/placeholder.png"}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <span className="absolute top-3 left-3 bg-white/90 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {event.category || "Event"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{event.title}</h1>

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

          <p className="text-gray-700 leading-relaxed mb-5">
            {event.desc || "No description available for this event."}
          </p>

          {/* Price & Seats */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <p className="text-2xl font-extrabold text-orange-600">৳{getNumber(event.price)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Available Seats</p>
              <p className="font-semibold text-gray-600">{getNumber(event.availableSeats)} / {getNumber(event.totalSeats)}</p>
            </div>
            {getNumber(event.discount) > 0 && (
              <div>
                <p className="text-sm text-gray-400">Discount</p>
                <p className="font-semibold text-red-500">{getNumber(event.discount)}%</p>
              </div>
            )}
          </div>

          {/* Buy Button */}
          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300">
            Buy Ticket 🎫
          </button>
        </div>
      </div>
    </section>
  );
}

