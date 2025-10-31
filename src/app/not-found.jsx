"use client";

import error from "../../public/error.json";
import React from "react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen my-10 bg-gradient-to-br from-base-100 via-base-200 to-base-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full"
      >
        {/* Main Card Container */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-6 sm:p-12 text-center">
            {/* Lottie Animation */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                
                {/* Lottie Container */}
                <div className="relative">
                  <Lottie
                    animationData={error}
                    loop={true}
                    autoplay={true}
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 404 Badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="badge badge-error gap-2 px-6 py-4 text-lg font-bold">
                <Search className="w-5 h-5" />
                404 Error
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={itemVariants} className="mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent">
                Oops! Page Not Found
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-base-content/70 text-lg sm:text-xl max-w-2xl mx-auto">
                The page you're looking for doesn't exist or may have been moved.
                Let's get you back on track!
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="divider"></motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              {/* Primary Button - Home */}
              <button
                onClick={() => router.push("/")}
                className="btn btn-primary gap-2 text-white shadow-lg min-w-[200px] hover:scale-105 transition-transform"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>

              {/* Secondary Button - Dashboard */}
              <Link href="/dashboard">
                <button className="btn btn-outline btn-primary gap-2 shadow-lg min-w-[200px] hover:scale-105 transition-transform">
                  <ArrowLeft className="w-5 h-5" />
                  Go to Dashboard
                </button>
              </Link>
            </motion.div>

            {/* Helper Links */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-base-300"
            >
              <p className="text-sm text-base-content/60 mb-4">
                Looking for something specific? Try these:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/browse-events"
                  className="link link-hover text-primary font-medium"
                >
                  Browse Events
                </Link>
                <Link
                  href="/Contacts"
                  className="link link-hover text-primary font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-base-content/50 text-sm">
            <span className="font-mono font-semibold">Error 404</span>
            <span>•</span>
            <span>Page Not Found</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
