import React from "react";
import { motion } from "framer-motion";

export default function HomeLayer({ children, title }) {
  return (
    <section className="w-full px-4 py-10 overflow-hidden">
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
        {title}
      </motion.h1>
      {children}
    </section>
  );
}
