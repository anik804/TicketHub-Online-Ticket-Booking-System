"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <FaSearch size={28} />,
      title: "Search Events",
      desc: "Find concerts, movies, and shows effortlessly with our smart search feature.",
      image: "/howItWorks/search_events.jpg",
    },
    {
      id: 2,
      icon: <FaTicketAlt size={28} />,
      title: "Book Your Ticket",
      desc: "Choose seats, pay securely, and get instant confirmation in seconds.",
      image: "/howItWorks/book_tickets.jpg",
    },
    {
      id: 3,
      icon: <FaCheckCircle size={28} />,
      title: "Enjoy the Event",
      desc: "Show your e-ticket at the venue and enjoy an unforgettable experience.",
      image: "/howItWorks/enjoy_event.jpg",
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden bg-base-100"
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-[#d96c2c] font-medium uppercase tracking-wide">
            How It Works
          </p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple Steps to Your Next Experience
          </motion.h2>
          {/* <motion.p
            className="text-gray-500 text-center pt-5 mb-16 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Booking tickets has never been easier — just follow these simple
            steps and get ready for your event.
          </motion.p> */}
        </div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative w-full h-[400px] rounded overflow-hidden shadow-xl transition-all duration-500 border border-transparent hover:border-[#d96c2c] hover:shadow-[0_0_20px_#d96c2c80]"
            >
              {/* Background Image */}
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#d96c2c]/90 p-2 rounded-full text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-200 text-sm">{step.desc}</p>

                <motion.div
                  className="mt-4 w-0 h-[3px] bg-[#d96c2c] rounded-full"
                  whileHover={{ width: "50%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
