"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const title = "Movies";

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: 10 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesName = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? movie.category === categoryFilter : true;
    return matchesName && matchesCategory;
  });

  const categories = Array.from(new Set(movies.map(movie => movie.category)));

  return (
    <div className="bg-base-100">
      {/* Banner */}
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center mt-[-80px]"
        style={{ backgroundImage: "url('/movies-banner.webp')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />
        <motion.div className="relative z-10" initial="hidden" animate="visible">
          <p className="text-gray-300 mb-2 text-lg md:text-xl tracking-wide">Home / Movies</p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white flex justify-center gap-2 overflow-hidden">
            {title.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} transition={{ delay: index * 0.1 }} className="inline-block">
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black mb-8"></div>

      {/* Search & Filter */}
      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-6 px-5 md:px-10 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Search Input */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileFocus={{ scale: 1.05 }}
          className="w-full md:w-1/2 relative"
        >
          <input
            type="text"
            placeholder="Search by movie name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 px-6 text-xl placeholder-gray-400 text-white border-2 border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full md:w-1/4 relative"
        >
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-16 px-4 text-xl text-gray-400 border-2 border-orange-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer transition-all duration-300"
          >
            <option value="" className="text-black">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-black">
                {cat}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>

      {/* Movies Grid */}
      <div className="px-5 md:px-10 lg:px-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie, index) => (
          <MovieCard key={movie._id} movie={movie} index={index} />
        ))}
        {filteredMovies.length === 0 && (
          <p className="text-center col-span-full text-gray-500 mt-10">No movies found.</p>
        )}
      </div>
    </div>
  );
}

const MovieCard = ({ movie, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group w-full h-100 lg:h-110 p-1 bg-green hover:bg-primary transition-all duration-600 ease-in-out rounded hover:shadow-md overflow-hidden"
    >
      <Link
        href={`/movies/${movie._id}`}
        className="w-full h-full flex items-end pb-5 lg:pb-8 rounded relative overflow-hidden"
      >
        <Image
          src={movie.imageUrl}
          alt={movie.name}
          width={500}
          height={500}
          className="absolute top-0 left-0 z-1 w-full h-full object-cover rounded scale-106 group-hover:scale-100 transition-all duration-600 ease-in-out"
        />
        <div className="w-full h-full absolute top-0 left-0 z-2 bg-gradient-to-b from-transparent to-[80%] to-black/90" />
        <div className="text-white px-5 lg:px-8 z-3">
          <p className="text-sm mb-2">{movie.category} / {movie.duration}</p>
          <p className="text-xl md:text-2xl font-semibold mb-5">{movie.name}</p>
          <button className="h-10 px-5 text-sm font-semibold bg-orange-600 hover:bg-white hover:text-black transition-all duration-300 ease-in-out rounded">
            Details
          </button>
        </div>
      </Link>
    </motion.div>
  );
};
