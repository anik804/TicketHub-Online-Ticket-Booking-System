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
      className={`
        text-white font-semibold px-2 md:px-5 py-2 rounded-md shadow-md transition-all duration-500 ease-in-out flex justify-center items-center ${
          disabled
            ? "opacity-40 cursor-not-allowed bg-gradient-to-r from-black to-black"
            : "bg-gradient-to-r from-primary to-orange-500 cursor-pointer hover:bg-gradient-to-r hover:from-primary hover:to-[#FF0000]"
        }  ${className}`}
    >
      {label}
    </motion.button>
  );
}
