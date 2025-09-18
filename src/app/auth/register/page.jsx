"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import registerAnimation from "../../../../public/animations/register.json"; // Lottie animation

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    photo: "",
    role: "User",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.terms) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    // NextAuth registration logic (example with credentials)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Automatically login after registration
        await signIn("credentials", {
          redirect: true,
          email: formData.email,
          password: formData.password,
        });
      } else {
        const error = await res.json();
        alert(error.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="min-h-screen flex items-center py-6 justify-center bg-white px-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        {/* Left Animation */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-50 to-indigo-50 items-center justify-center p-6">
          <Lottie animationData={registerAnimation} loop={true} className="w-80 h-80" />
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
            Create Your Ticketing Account ✨
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center text-gray-500 mb-6"
          >
            Join now and unlock a seamless way to book events, concerts, and shows — anytime, anywhere 🎟️
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Phone Number</label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Photo URL</label>
              <input
                name="photo"
                type="text"
                value={formData.photo}
                onChange={handleChange}
                placeholder="Photo URL"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="User">User</option>
                <option value="Organizer">Organizer</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                name="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
                required
                className="h-4 w-4 accent-indigo-600"
              />
              <label className="text-gray-600 text-sm">
                I agree to the <Link href="/terms" className="text-black hover:underline">Terms & Conditions</Link>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
            >
              Register
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center text-gray-500 text-sm"
          >
            Already have an account?{" "}
            <Link href="/auth/login" className="text-black font-medium hover:underline">
              Login here
            </Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
