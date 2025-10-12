"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";

export default function GetAnswers() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email.");
    toast.success("✅ Thank you for subscribing!");
    setEmail("");
  };

  const faqs = [
    {
      q: "How do I book a ticket on TicketHub?",
      a: "Browse events, select your preferred one, choose seats in real-time, complete payment, and instantly receive your e-ticket via email.",
    },
    {
      q: "Can I cancel or refund my ticket?",
      a: "Yes, you can cancel from your User Dashboard. Refunds are processed automatically according to the organizer’s policy.",
    },
    {
      q: "Is my payment secure?",
      a: "Absolutely. We use SSL/TLS encryption and trusted gateways like Stripe and PayPal for secure transactions.",
    },
    {
      q: "Can I book tickets for multiple people?",
      a: "Yes, group bookings are supported. You can assign tickets to multiple attendees during checkout.",
    },
    {
      q: "What if I don’t receive my ticket?",
      a: "Check your spam folder first. If not found, visit your Dashboard → Bookings to download it again.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold 
                       drop-shadow-lg"
        >
          🎟 Stay Informed — Get Answers & Event Updates
        </h2>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Have questions about booking or payments? Want to stay updated on the
          latest events? Get everything you need — all in one place.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Left — FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-8 
                        text-center lg:text-left"
          >
            ❓ Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-200 border border-gray-300 rounded-xl"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold text-[#3D0000]">
                  {item.q}
                </div>
                <div className="collapse-content text-gray-700 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Newsletter Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-3xl md:text-4xl font-bold text-center 
                         
                          mb-4"
          >
            📰 Subscribe to Our Newsletter
          </h3>

          <p className="text-gray-600 text-center mb-8 text-lg">
            Stay ahead with event alerts, early ticket access, and exclusive
            promotions.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-xl 
                         border border-gray-300 bg-base-100 text-gray-800 
                         placeholder-gray-400 text-lg focus:outline-none 
                         focus:ring-2 focus:ring-[#FF0000]/50"
              required
            />
            <motion.button
              type="submit"
              className=" border-black hover:bg-[#d96c2c] btn
                         px-6 py-3 rounded-xl font-semibold text-lg shadow-md 
                         transition-all duration-300 hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>

          {/* Illustration */}
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1538905386057-4a5a580c45a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Newsletter illustration"
              width={450}
              height={300}
              className="rounded-2xl shadow-lg border border-gray-200 object-cover"
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
