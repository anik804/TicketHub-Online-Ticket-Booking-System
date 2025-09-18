"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import loginAnimation from "../../../../public/animations/login.json";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    // TODO: Add authentication logic
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* Left Animation */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-50 to-indigo-50 items-center justify-center p-6">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-80 h-80"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Animated Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-2"
          >
            Login to Your Journey 🎟️
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center text-gray-500 mb-6"
          >
            Access your e-tickets, manage bookings, and start your hassle-free
            travel experience.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
            >
              Login
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-gray-500 text-sm"
          >
            Don’t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-black font-medium hover:underline"
            >
              Register here
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
