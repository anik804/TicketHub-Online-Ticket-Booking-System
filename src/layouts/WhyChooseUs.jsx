"use client";

import { ShieldCheck, Zap, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#950101]" />,
      title: "Secure Payments",
      desc: "Safe transactions with SSL/TLS encryption.",
    },
    {
      icon: <Zap className="w-12 h-12 text-[#950101]" />,
      title: "Instant Confirmation",
      desc: "Get your ticket confirmation instantly after booking.",
    },
    {
      icon: <RotateCcw className="w-12 h-12 text-[#950101]" />,
      title: "Easy Refunds",
      desc: "Quick refunds for canceled bookings.",
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#950101]" />,
      title: "24/7 Support",
      desc: "Round-the-clock customer assistance.",
    },
  ];

  return (
    <section className="w-full px-4 py-20 bg-[#000000] text-white">
      {/* Animated Heading (no movement, only color change) */}
      <motion.h1
        className="pb-10 text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        animate={{
          color: ["#000000", "#3D0000", "#950101", "#FF0000", "#000000"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        Why Choose Us
      </motion.h1>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="p-8 rounded-2xl bg-[#3D0000] flex flex-col items-center text-center shadow-md hover:shadow-2xl border border-[#95010133]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 10px 30px rgba(255,0,0,0.4)",
            }}
          >
            <div className="mb-6 bg-[#FF000022] rounded-full p-5 flex items-center justify-center">
              {f.icon}
            </div>
            <h2 className="text-xl font-bold mb-3 text-[#FF0000]">
              {f.title}
            </h2>
            <p className="text-gray-300">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
