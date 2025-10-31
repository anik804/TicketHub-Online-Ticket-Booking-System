"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then(setBlogs)
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="text-white">
      {/* Banner */}
      <div className="relative h-[420px] md:h-[500px] w-full flex items-center justify-center overflow-hidden">
        <img
          src="/blogs-banner.jpg"
          alt="Blogs Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] z-"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-300 mb-3 text-sm md:text-base tracking-wide"
          >
            Home / Blogs
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100, delay: 0.3 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            All Blogs
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-[4px] bg-primary mt-4 mx-auto rounded-full"
          ></motion.div>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

      {/* Add Blog Button */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-end">
        <Link
          href="/blogs/add"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-orange-400 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          Add Blog
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No blogs found. Be the first to post!
          </p>
        ) : (
          blogs.map((blog, i) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg border border-zinc-800 hover:border-orange-400 transition-all"
            >
              {/* Background Image */}
              <img
                src={blog.image || "/placeholder.jpg"}
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>

              {/* Title + Category + Button */}
              <motion.div
                className="absolute bottom-4 left-4 z-20 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
              >
                <p className="text-sm uppercase text-primary font-semibold">
                  {blog.category}
                </p>
                <h2 className="text-xl md:text-2xl font-bold">{blog.title}</h2>
                <Link
                  href={`/blogs/${blog._id}`}
                  className="mt-2 inline-block bg-primary px-4 py-2 rounded text-sm font-semibold hover:bg-orange-400 transition-all"
                >
                  Details
                </Link>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
