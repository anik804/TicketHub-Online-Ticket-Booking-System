"use client";

import { motion } from "framer-motion";
import { FaMusic, FaFilm, FaFutbol, FaTheaterMasks, FaPlane } from "react-icons/fa";

const categories = [
  { id: 1, title: "Concerts", icon: <FaMusic size={30} /> },
  { id: 2, title: "Movies", icon: <FaFilm size={30} /> },
  { id: 3, title: "Sports", icon: <FaFutbol size={30} /> },
  { id: 4, title: "Theater", icon: <FaTheaterMasks size={30} /> },
  { id: 5, title: "Travel & Tours", icon: <FaPlane size={30} /> },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-[#000000]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold mb-12 text-[#FF0000]"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Categories
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-[#3D0000] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "#950101" }}
            >
              <div className="text-[#FF0000] mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
