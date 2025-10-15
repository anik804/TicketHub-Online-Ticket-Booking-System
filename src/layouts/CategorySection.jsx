"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaMusic,
  FaFilm,
  FaFutbol,
  FaTheaterMasks,
  FaPlane,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Concerts",
    icon: <FaMusic size={20} />,
    image: "/categories/concerts.jpg",
    desc: "Live music events near you",
  },
  {
    id: 2,
    title: "Movies",
    icon: <FaFilm size={20} />,
    image: "/categories/movies.jpg",
    desc: "Latest blockbusters & screenings",
  },
  {
    id: 3,
    title: "Sports",
    icon: <FaFutbol size={20} />,
    image: "/categories/sports.jpg",
    desc: "Exciting games & tournaments",
  },
  {
    id: 4,
    title: "Theater",
    icon: <FaTheaterMasks size={20} />,
    image: "/categories/theater.jpg",
    desc: "Dramatic performances & plays",
  },
  {
    id: 5,
    title: "Travel & Tours",
    icon: <FaPlane size={20} />,
    image: "/categories/travel&tour.jpg",
    desc: "Explore new destinations",
  },
];

export default function CategorySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* 🎬 Background like “Movies Now Playing” */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/exploreCategories.jpg" // 🔹 use a light dotted/filmstrip style background
          alt="Background pattern"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-orange-600 font-medium uppercase tracking-wide">
            Discover More
          </p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Categories
          </motion.h2>

          <motion.p className="text-gray-600 text-center pt-5 mb-16 text-lg md:text-xl" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} > Discover amazing experiences — concerts, movies, sports, theater & travel. </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative w-full h-[380px] rounded overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Card Image */}
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay (similar to movie cards) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-orange-500/90 p-2 rounded-full">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{category.title}</h3>
                </div>
                <p className="text-gray-200 text-sm mb-5">{category.desc}</p>

                <Link href={`/categories/${category.title.toLowerCase()}`}>
                  <button className="px-6 py-2 text-sm font-semibold bg-white text-gray-900 rounded shadow hover:bg-orange-600 hover:text-white transition-all duration-300">
                    Explore Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
