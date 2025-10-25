"use client";

import { ShieldCheck, Zap, RotateCcw, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Payments",
      desc: "Safe and encrypted transactions for peace of mind.",
      image: "/whychooseus/secure.webp",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Confirmation",
      desc: "Receive your booking confirmation instantly — no delays.",
      image: "/whychooseus/instant.jpg",
    },
    {
      icon: <RotateCcw size={28} />,
      title: "Easy Refunds",
      desc: "Hassle-free and quick refunds for canceled tickets.",
      image: "/whychooseus/refunds.webp",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "Our friendly team is available anytime you need help.",
      image: "/whychooseus/support.avif",
    },
  ];

  return (
    <section
      className="relative py-24 overflow-hidden bg-white"
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-[#d96c2c] font-medium uppercase tracking-wide">
            Why Choose Us
          </p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Trusted Experience Partner
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center pt-5 mb-16 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We’re dedicated to making your ticket booking experience safe,
            smooth, and stress-free.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative w-full h-[380px] rounded overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image */}
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#d96c2c]/90 p-2 rounded-full text-white">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{f.title}</h3>
                </div>
                <p className="text-gray-200 text-sm">{f.desc}</p>

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
