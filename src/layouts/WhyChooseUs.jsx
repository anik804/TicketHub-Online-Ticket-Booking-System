"use client";

import { ShieldCheck, Zap, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-white" />,
      title: "Secure Payments",
      desc: "Safe and encrypted transactions for peace of mind.",
    },
    {
      icon: <Zap className="w-10 h-10 text-white" />,
      title: "Instant Confirmation",
      desc: "Receive your booking confirmation instantly — no delays.",
    },
    {
      icon: <RotateCcw className="w-10 h-10 text-white" />,
      title: "Easy Refunds",
      desc: "Hassle-free and quick refunds for canceled tickets.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-white" />,
      title: "24/7 Support",
      desc: "Our friendly team is available anytime you need help.",
    },
  ];

  return (
    <section className="py-24 bg-[#FFF8F3] relative overflow-hidden">
      {/* Gradient Glow Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFEFE6]/60 via-[#FFF8F3] to-[#FFF8F3]" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#FF7F50]/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FF4500]/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Animated Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-16 
                     bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                     bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us
        </motion.h2>

        {/* Features Grid */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/70 backdrop-blur-md rounded-3xl 
                         border border-[#FFD1B3]/50 shadow-lg p-8 flex flex-col items-center 
                         text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Gradient Ring Icon */}
              <div className="mb-6 w-20 h-20 rounded-full flex items-center justify-center 
                              bg-gradient-to-br from-[#FF7F50] via-[#FF4500] to-[#FF0000] shadow-md">
                {f.icon}
              </div>

              <h3 className="text-xl font-bold text-[#FF4500] mb-2">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>

              {/* Accent Line */}
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
