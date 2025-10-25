"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
       <motion.button
  key="back-to-top"
  onClick={scrollToTop}
  initial={{ opacity: 0, scale: 0.5, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.5, y: 30 }}
  transition={{ duration: 0.3 }}
  className="fixed bottom-6 right-6 z-[9999] bg-[#d96c2c] text-white px-2 py-3 rounded-lg shadow-lg transition-all"
  aria-label="Back to top"
>
  <FaArrowUp className="text-xl" />
</motion.button>

      )}
    </AnimatePresence>
  );
}
