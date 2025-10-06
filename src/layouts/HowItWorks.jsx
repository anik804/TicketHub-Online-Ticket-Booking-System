"use client";

import { motion } from "framer-motion";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={34} />,
    title: "Search Events",
    description:
      "Find concerts, movies, and shows effortlessly with our smart search feature.",
  },
  {
    id: 2,
    icon: <FaTicketAlt size={34} />,
    title: "Book Your Ticket",
    description:
      "Choose seats, pay securely, and get instant confirmation in seconds.",
  },
  {
    id: 3,
    icon: <FaCheckCircle size={34} />,
    title: "Enjoy the Event",
    description:
      "Show your e-ticket at the venue and enjoy an unforgettable experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#FFF8F3] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl font-bold mb-14 text-[#FF4500] drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative rounded-3xl bg-white p-10 border border-[#FFD1B3] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="flex justify-center items-center mb-6 text-[#FF4500]">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Animated Accent Line */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#FF7F50] rounded-full"
                whileHover={{ width: "40%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
