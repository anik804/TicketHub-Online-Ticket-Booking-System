"use client";
import React from "react";
import { motion } from "motion/react";
import HomeLayer from "@/ui/HomeLayer";
import { BsCalendarDate } from "react-icons/bs";

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
    <HomeLayer title="Special Offers">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {events.map((event, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: (index + 1) * 0.3, ease: "easeInOut" }}
            key={index}
            className="p-[1px] rounded-[8px] shadow-md hover:shadow-secondary/30 hover:scale-102 hover:rotate-3 custom-transition relative overflow-hidden "
          >
            <div className="absolute top-0 right-0 bg-transparent w-full h-full z-1 scale-200 bg-gradient-to-l from-secondary to-[40%] to-transparent glow-border-spin" />

            <div className="flex visible flex-col items-center justify-center bg-base-200 rounded-[7px] relative z-2 p-4">
            <span className="inline-block text-2xl lg:text-3xl text-transparent bg-[#950101] font-bold glow-text mt-2 mb-4">
                {event.discount}
              </span>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-lg rounded-lg py-1 px-3 my-2 shadow flex items-center gap-2">
              <BsCalendarDate /> {event.date}
              </p>
              <p className="text-xl font-semibold">{event.location}</p>
              <motion.p 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,   
                repeatType: "reverse",
                ease: "linear",
              }}
              className="my-3 font-semibold text-[#FF0000] text-2xl">
                Only Taka {event.price}
              </motion.p>
              
            </div>
          </motion.div>
        ))}
      </div>
    </HomeLayer>
  );
}