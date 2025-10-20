"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-black dark:text-gray-100">
    {/* 🔹 Banner Section */}
<div
  className="relative h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
  style={{
    backgroundImage: "url('/contact.jpg')",
  }}
>
  {/* Dark blur overlay */}
  <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"></div>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10"
  >
    <p className="text-gray-300 mb-2">Home / Contact</p>
    <h1 className="text-4xl md:text-5xl font-bold text-white">Contact</h1>
  </motion.div>
</div>

{/* 🔸 Full-width dotted divider under banner */}
<div className="w-full pt-2 border-b-6 border-dashed border-black"></div>




      {/* 🔹 Contact Form Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-[#d96c2c] uppercase font-semibold">Contact With Us</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Get in Touch with TicketHub
        </h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-10 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
            />
          </div>

          <textarea
            name="message"
            rows="5"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent mb-6"
          ></textarea>

          <button
            type="submit"
            className="bg-[#d96c2c] hover:bg-[#ff8533] transition text-white font-semibold py-3 px-8 rounded w-full"
          >
            Send Message
          </button>

          {submitted && (
            <p className="mt-4 text-green-600 font-medium animate-pulse">
              ✅ Your message has been sent successfully!
            </p>
          )}
        </motion.form>
      </div>

      {/* 🔹 Info Cards Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6 pb-20">
        {/* About */}
        <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute right-6 top-6 text-[#d96c2c] opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-square-2"
            >
              <path d="M6 22a8 8 0 0 1 12 0" />
              <circle cx="12" cy="10" r="4" />
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-left">About</h3>
          <p className="text-gray-700 dark:text-gray-300 text-left">
            TicketHub is Bangladesh’s trusted online ticket booking platform.
            We make your journey easier by providing a fast, secure, and
            convenient way to book tickets for concerts, events, movies, and more.
          </p>
        </div>

        {/* Address */}
        <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute right-6 top-6 text-[#d96c2c] opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin"
            >
              <path d="M21 10c0 5.523-9 13-9 13s-9-7.477-9-13a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-left">Address</h3>
          <p className="text-left">
            TicketHub HQ<br />
            House 15, Road 12, Dhanmondi,<br />
            Dhaka 1209, Bangladesh
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute right-6 top-6 text-[#d96c2c] opacity-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
              <circle cx="5" cy="17" r="4" />
              <circle cx="19" cy="17" r="4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-left">Contact</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-left">
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-[#d96c2c]" /> +880 1700-123456
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-[#d96c2c]" /> support@tickethub.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-[#d96c2c]" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Map Section */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.875435484484!2d90.36650927517746!3d23.750866389220404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf565aefadfd%3A0x30d843b0ed0aefdb!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1697032590174!5m2!1sen!2sbd"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
