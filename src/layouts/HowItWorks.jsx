"use client";

import { motion } from "framer-motion";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={40} />,
    title: "Search Events",
    description: "Find concerts, movies, and shows quickly with our smart search.",
  },
  {
    id: 2,
    icon: <FaTicketAlt size={40} />,
    title: "Book Your Ticket",
    description: "Choose seats, pay securely, and get instant confirmation.",
  },
  {
    id: 3,
    icon: <FaCheckCircle size={40} />,
    title: "Enjoy the Event",
    description: "Show your e-ticket at the venue and have a great time!",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title with animated colors */}
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          animate={{
            color: ["#000000", "#3D0000", "#950101", "#FF0000", "#000000"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="w-full bg-[#3D0000] rounded-2xl p-8 shadow-md hover:shadow-2xl flex flex-col items-center text-center border border-[#95010133]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0px 10px 30px rgba(255,0,0,0.4)",
              }}
            >
              <div className="flex justify-center items-center mb-6 text-[#FF0000]">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#FF0000] mb-3">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
