"use client";
import React from "react";
import { motion } from "motion/react";

export default function SpecialOffers() {
  // Dummy event data
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2025-10-20",
      location: "Dhaka, Bangladesh",
      price: 1200,
      discount: "20% Off",
    },
    {
      id: 2,
      title: "Tech Expo 2025",
      date: "2025-11-05",
      location: "Chittagong, Bangladesh",
      price: 800,
      discount: "Early Bird",
    },
    {
      id: 3,
      title: "Food Carnival",
      date: "2025-10-25",
      location: "Sylhet, Bangladesh",
      price: 500,
      discount: "Buy 1 Get 1",
    },
    {
      id: 4,
      title: "Comedy Night",
      date: "2025-12-01",
      location: "Dhaka, Bangladesh",
      price: 700,
      discount: "15% Off",
    },
  ];

  return (
    <section className="w-full px-4 py-10 bg-[#000000]">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          color: ["#FF0000", "#950101", "#3D0000", "#FF0000"], // looping colors
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
        className="pb-8 text-3xl md:text-4xl font-extrabold text-center tracking-wide"
      >
        🎟 Special Offers
      </motion.h1>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            className="relative overflow-hidden p-[1px] rounded-xl shadow-lg 
                       bg-gradient-to-br from-[#950101] via-[#FF0000] to-[#3D0000] 
                       hover:shadow-2xl hover:scale-105 transition-all"
          >
            <div className="flex flex-col items-center justify-center bg-[#000000] rounded-lg relative z-10 p-5 h-full">
              <h2 className="text-xl font-bold mb-2 text-white text-center">
                {event.title}
              </h2>
              <p className="text-sm text-[#FF0000] bg-[#3D0000] rounded-lg px-3 py-1 mb-2 shadow">
                {event.date}
              </p>
              <p className="text-base font-medium text-gray-300 mb-2">
                {event.location}
              </p>
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1.1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="font-bold text-[#FF0000] text-2xl"
              >
                ৳{event.price}
              </motion.p>
              <span className="inline-block mt-2 text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#950101] animate-pulse">
                {event.discount}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
