"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold tracking-wide">
          Get in <span className="text-[#FF0000]">Touch</span>
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Have questions or feedback? Fill out the form or reach us directly
          through the contact details below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-orange-50 p-10 rounded-3xl shadow-lg border border-orange-200"
        >
          <h2 className="text-3xl font-bold mb-2">
            Send us a Message
          </h2>
          <p className="text-gray-700 mb-6">
            We'd love to hear from you! Fill out the form below and we’ll get back to you shortly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-300 focus:border-[#FF0000] focus:ring focus:ring-[#FF0000]/30 outline-none transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-300 focus:border-[#FF0000] focus:ring focus:ring-[#FF0000]/30 outline-none transition"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 rounded-xl bg-white border border-gray-300 focus:border-[#FF0000] focus:ring focus:ring-[#FF0000]/30 outline-none transition"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-gradient-to-r from-[#950101] to-[#FF0000] font-semibold hover:opacity-95 transition"
            >
              Send Message
            </button>
          </form>

          {submitted && (
            <div className="mt-4 text-center text-green-600 font-medium animate-pulse">
              ✅ Your message has been sent successfully!
            </div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="bg-orange-50 p-8 rounded-3xl shadow-lg border border-orange-200">
            <h2 className="text-2xl font-semibold mb-6 border-b border-orange-200 pb-2">
              Contact Information
            </h2>
            <ul className="space-y-4 text-gray-900">
              <li className="flex items-center gap-3">
                <Mail className="text-[#FF0000]" /> contact@tickethub.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#FF0000]" /> +880 1234-567890
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-[#FF0000]" /> Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-orange-200 shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.245931866444!2d90.39945201538573!3d23.810331384557556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c74fef3dfdbd%3A0xe0bb5f5d57f9c9df!2sDhaka!5e0!3m2!1sen!2sbd!4v1674036270280!5m2!1sen!2sbd"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#950101] hover:bg-[#FF0000] transition"
            >
              <Facebook size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#950101] hover:bg-[#FF0000] transition"
            >
              <Twitter size={20} className="text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#950101] hover:bg-[#FF0000] transition"
            >
              <Instagram size={20} className="text-white" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
