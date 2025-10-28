"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MovieDetailsClient({ movie }) {
  const title = movie.name;
  const [readMore, setReadMore] = useState(false);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const toggleReadMore = () => setReadMore(!readMore);

  return (
    <div className="bg-base-100">
      {/* Banner */}
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('${movie.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />
        <motion.div className="relative z-10" initial="hidden" animate="visible">
          <p className="text-gray-300 mb-2 text-lg md:text-xl tracking-wide">
            Home / Movies / {movie.name}
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white flex justify-center gap-2 overflow-hidden">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                transition={{ delay: index * 0.05 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black mb-8"></div>

      {/* Movie Details Section */}
      <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          {/* Left: Movie Image */}
          <div className="w-full h-full relative rounded-lg overflow-hidden flex items-stretch">
            <Image
              src={movie.imageUrl}
              alt={movie.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right: Movie Info */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">{movie.name}</h2>
              <p className="text-gray-600 mb-2">
                {movie.category} / {movie.duration}
              </p>
              <p className="text-gray-600 mb-2">
                Director: {movie.director} | Writer: {movie.writer}
              </p>
              <p className="text-gray-600 mb-2">Language: {movie.language}</p>
              <p className="text-gray-600 mb-2">Location: {movie.location}</p>
              <p className="text-gray-600 mb-2">
                Date: {movie.date} | Time: {movie.time}
              </p>
              <p className="text-gray-600 mb-4">Ticket Price: ৳{movie.ticketPrice}</p>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-800">
                  {readMore ? movie.description : `${movie.description.slice(0, 150)}...`}
                  {movie.description.length > 150 && (
                    <button
                      onClick={toggleReadMore}
                      className="ml-2 text-orange-500 font-semibold hover:underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>

            {/* Buy Ticket Button */}
            <button className="mt-4 md:mt-0 px-8 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition w-max">
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
