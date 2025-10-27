"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[80vh] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <div className="bg-orange-100 p-6 rounded-full mb-6 shadow-md">
        <AlertTriangle className="w-12 h-12 text-orange-500" />
      </div>

      {/* Text */}
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Button */}
      <Link
        href="/dashboard"
        className="bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200"
      >
        Return to Dashboard
      </Link>
    </motion.div>
  );
}
