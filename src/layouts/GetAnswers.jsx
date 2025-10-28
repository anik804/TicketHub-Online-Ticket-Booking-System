"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaQuestion } from "react-icons/fa6";

export default function GetAnswers() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email.");
    toast.success("✅ Thank you for subscribing!", { duration: 1500 });
    setEmail("");
  };

  const faqs = [
    {
      q: "How do I book a ticket on TicketHub?",
      a: "Browse events, select your preferred one, choose seats in real-time, complete payment, and instantly receive your e-ticket via email.",
    },
    {
      q: "Can I cancel or refund my ticket?",
      a: "Yes, you can cancel from your User Dashboard. Refunds are processed automatically according to the organizer's policy.",
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
      q: "What if I don't receive my ticket?",
      a: "Check your spam folder first. If not found, visit your Dashboard → Bookings to download it again.",
    },
    {
      q: "How do organizers manage their events?",
      a: "Organizers have a dedicated dashboard to create events, manage ticket inventory, view bookings, and issue refunds.",
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
        <h2 className="text-4xl md:text-5xl font-extrabold text-base-content drop-shadow-lg">
          <span className="text-primary">Get Answers</span> & Stay Connected
        </h2>
        <p className="text-base-content/70 text-lg mt-4 max-w-2xl mx-auto">
          Have questions or want to stay updated on upcoming events?
          Learn, connect, and never miss a moment with TicketHub.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — FAQ Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-2xl shadow-md border h-full border-primary/30 p-8"
        >
          <h3 className="text-3xl font-bold mb-8  text-center lg:text-left">
        ❓Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-200 border border-base-300 rounded-xl"
              >
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold text-primary">
                  {item.q}
                </div>
                <div className="collapse-content text-base-content/80 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Newsletter Section */}
        <motion.div
          className="bg-base-100 rounded-2xl shadow-lg p-16 border border-primary/30"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl text-base-content mb-4 -mt-5 font-bold text-center">
            Subscribe to Our Newsletter
          </h3>

          <p className="text-lg text-center text-base-content/70 mb-8">
            Stay ahead with event alerts, early ticket access,
            and exclusive offers — delivered straight to your inbox.
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
                         border border-base-300 bg-base-100 text-base-content
                         placeholder-base-content/40 text-lg focus:outline-none 
                         focus:ring-2 focus:ring-primary"
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-2 text-sm btn btn-primary font-semibold rounded shadow hover:bg-primary-focus transition-all duration-300"
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
              src="https://images.unsplash.com/photo-1538905386057-4a5a580c45a6?w=600&auto=format&fit=crop&q=60"
              alt="Newsletter illustration"
              width={450}
              height={500}
              className="rounded-2xl shadow-xl border border-primary/40 object-cover"
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
