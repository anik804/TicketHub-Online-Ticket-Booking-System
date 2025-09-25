"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSocialLogin = async (providerName) => {
    try {
      setLoading(true);

      const result = await signIn(providerName, {
        callbackUrl: "/", // where to redirect
      });

      if (!result?.error) {
        router.push(result?.url || "/");
      }
      // Errors are silently ignored
    } catch (err) {
      console.error("Social login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="text-center my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-lg font-semibold text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Or Continue With
      </motion.h2>

      <div className="flex justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
          className="flex items-center gap-2 bg-white shadow-md rounded-full px-5 py-3 border border-gray-200 hover:shadow-lg transition disabled:opacity-50"
        >
          <FaGoogle size={20} color="#DB4437" />
          <span className="font-medium text-gray-700">
            {loading ? "Signing in..." : "Google"}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSocialLogin("github")}
          disabled={loading}
          className="flex items-center gap-2 bg-gray-900 text-white shadow-md rounded-full px-5 py-3 border border-gray-800 hover:shadow-lg transition disabled:opacity-50"
        >
          <FaGithub size={20} />
          <span className="font-medium">
            {loading ? "Signing in..." : "GitHub"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
