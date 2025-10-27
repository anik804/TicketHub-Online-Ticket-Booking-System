"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch size={28} />,
    title: "Search Events",
    description:
      "Find concerts, movies, and shows effortlessly with our smart search feature.",
  },
  {
    id: 2,
    icon: <FaTicketAlt size={28} />,
    title: "Book Your Ticket",
    description:
      "Choose seats, pay securely, and get instant confirmation in seconds.",
  },
  {
    id: 3,
    icon: <FaCheckCircle size={28} />,
    title: "Enjoy the Event",
    description:
      "Show your e-ticket at the venue and enjoy an unforgettable experience.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative py-32 bg-base-100"
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        {/* Section Header */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16   drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <AnimatePresence key={step.id}>
              <motion.div
                className="relative bg-white border-4 border-[#d96c2c] rounded shadow-lg p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className="flex justify-center items-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FFEEE6] to-[#FFD1B3] text-[#d96c2c] mb-6 shadow-md">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#d96c2c] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Optional Floating Accent Icon */}
                <motion.div
                  className="absolute -bottom-6 right-6 w-14 h-14 bg-[#FF7F50] rounded-full flex items-center justify-center shadow-md"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step.icon}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </section>
  );
}
