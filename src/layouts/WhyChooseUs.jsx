"use client";

import { ShieldCheck, Zap, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      title: "Secure Payments",
      desc: "Safe transactions with SSL/TLS encryption.",
    },
    {
      icon: <Zap className="w-12 h-12 text-white" />,
      title: "Instant Confirmation",
      desc: "Get your ticket confirmation instantly after booking.",
    },
    {
      icon: <RotateCcw className="w-12 h-12 text-white" />,
      title: "Easy Refunds",
      desc: "Quick refunds for canceled bookings.",
    },
    {
      icon: <Headphones className="w-12 h-12 text-white" />,
      title: "24/7 Support",
      desc: "Round-the-clock customer assistance.",
    },
  ];

  return (
    <section className="w-full px-4 py-20">
      {/* Animated Heading */}
      <motion.h1
        className="pb-10 text-3xl md:text-4xl font-extrabold text-center
                   bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                   bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Why Choose Us
      </motion.h1>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="w-full p-8 rounded-2xl 
                       bg-gradient-to-br from-[#FF7F50] via-[#FF4500] to-[#FF0000] 
                       flex flex-col items-center text-center shadow-lg hover:shadow-2xl 
                       border border-[#ffffff22] transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(255,99,71,0.5)",
            }}
          >
            <div className="mb-4 bg-white/20 rounded-full p-5 flex items-center justify-center">
              {f.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{f.title}</h2>
            <p className="text-white/80">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
