import React from "react";
import { motion } from "motion/react";

export default function Button({ label, onClick, disabled, className, type }) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer bg-gradient-to-r from-white to-gray-100
        hover:bg-gradient-to-r hover:from-primary hover:to-[#FF0000]
        text-white font-semibold px-5 py-2 rounded-md shadow-md transition hover:opacity-90 ${className}`}
    >
      {label}
    </motion.button>
  );
}
