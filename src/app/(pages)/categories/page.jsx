// app/categories/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const icons = ["🎬","🎵","🎭","🏟️","✈️","🛠️","🎉","🖼️"];



useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  fetchCategories();
}, []);



  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-red-700 via-red-500 to-orange-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Categories
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <Link key={cat} href={`/categories/${cat}`}>
              <motion.div
                className="p-6 rounded-3xl flex flex-col items-center justify-center cursor-pointer
                           bg-gradient-to-br from-red-800 via-red-600 to-red-400
                           hover:scale-105 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{icons[index % icons.length]}</div>
                <h3 className="text-white font-semibold text-lg">{cat}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
