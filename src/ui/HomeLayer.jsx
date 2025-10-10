"use client";
import React from "react";
import { motion } from "motion/react"

export default function HomeLayer({ children, icon, title, subtitle }) {
  return (
    <section className="w-full px-5 py-5 my-5 overflow-hidden">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
        className="flex flex-col justify-center items-center mb-6 md:mb-10"
      >
        <span className="text-primary text-2xl mb-1">{icon}</span>
        <p className="text-sm text-gray-600 font-semibold mb-3 md:mb-5">
          {subtitle}
        </p>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold">{title}</p>
      </motion.div>
      {children}
    </section>
  );
}
