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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-extrabold mb-12 text-center
                     bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                     bg-clip-text text-transparent"
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
  className="group relative rounded-3xl overflow-hidden shadow-lg
             p-6 flex flex-col items-center justify-center cursor-pointer
             bg-gradient-to-br from-[#4d0000] via-[#a60000] to-[#ff4d4d] h-40 
             border-[1px] border-transparent hover:border-[1px] hover:border-gradient-to-r 
             hover:from-[#ff7f50] hover:via-#ffa07a] hover:to-[#ffd1a4]
             transition-all duration-300"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(255, 99, 71, 0.4)" }}
>
  <div className="text-white mb-4">{category.icon}</div>
  <h3 className="text-lg text-white font-semibold ">{category.title}</h3>
            </motion.div>


          ))}
        </div>
      </div>
    </section>
  );
}
