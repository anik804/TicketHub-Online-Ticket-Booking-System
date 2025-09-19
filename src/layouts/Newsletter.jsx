"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email.");
    console.log("Subscribed with:", email); // Replace with API call
    alert("✅ Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto  md:px-10 sm:px-4 px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold 
                       bg-gradient-to-r from-[#950101] to-[#FF0000]
                       bg-clip-text text-transparent"
          >
            📰 Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 text-lg mt-3">
            Get the latest event updates, early access to tickets, and special
            discounts — straight to your inbox!
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1538905386057-4a5a580c45a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Newsletter Illustration"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl border border-gray-200 object-cover"
              unoptimized
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="text-center md:text-left space-y-6 
                       bg-[#fff7ed] rounded-2xl p-10 shadow-lg border border-gray-200"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#950101]">
              🎉 Stay Updated with Our Latest Events
            </h3>
            <p className="text-lg text-gray-600">
              Subscribe to get event notifications, special offers, and early
              access to exclusive tickets.
            </p>

            {/* Form */}
            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl 
                           border border-gray-300 bg-base-100 
                           text-gray-800 placeholder-gray-400 text-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50"
                required
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-[#950101] to-[#FF0000] text-white 
                           px-6 py-3 rounded-xl font-semibold text-lg shadow-md 
                           transition-all duration-300 hover:scale-105"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.08 }}
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
