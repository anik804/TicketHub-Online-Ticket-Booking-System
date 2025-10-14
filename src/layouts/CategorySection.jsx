"use client";

import { motion } from "framer-motion";
import { FaMusic, FaFilm, FaFutbol, FaTheaterMasks, FaPlane } from "react-icons/fa";

const categories = [
  { id: 1, title: "Concerts", icon: <FaMusic size={26} />, image: "/categories/concerts.jpg", desc: "Live music events near you" },
  { id: 2, title: "Movies", icon: <FaFilm size={26} />, image: "/categories/movies.jpg", desc: "Latest blockbusters & screenings" },
  { id: 3, title: "Sports", icon: <FaFutbol size={26} />, image: "/categories/sports.jpg", desc: "Exciting games & tournaments" },
  { id: 4, title: "Theater", icon: <FaTheaterMasks size={26} />, image: "/categories/theater.jpg", desc: "Dramatic performances & plays" },
  { id: 5, title: "Travel & Tours", icon: <FaPlane size={26} />, image: "/categories/travel&tour.jpg", desc: "Explore new destinations" },
];

export default function CategorySection() {
  return (
    <section className="py-24  bg-base-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
          <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4
                    text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Categories
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-800 font-bold mb-16 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover amazing experiences — concerts, movies, sports, theater & travel.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  {category.icon}
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-[#d96c2c]">{category.title}</h3>
                <p className="text-gray-500 mt-2">{category.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
