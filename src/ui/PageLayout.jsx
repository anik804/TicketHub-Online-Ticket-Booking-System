"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PageLayout({ className, children, title, imageURL }) {
  const { data: session, status } = useSession();

  // Show loader while session state is being determined
  if (status === "loading") {
    return <Loading />;
  }

  // Prevent flicker when user is not authenticated
  if (!session) return null;

  return (
    <section className="min-h-dvh w-full bg-base-100 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-54 md:h-76 lg:h-84 pb-3 border-b-10 md:border-b-14 border-dashed border-black relative flex items-center justify-center"
      >
        <div className="w-full h-[97%] absolute top-0 left-0 z-0 bg-black" />
        {imageURL && (
          <Image
            src={imageURL || null}
            width={500}
            height={500}
            alt="background"
            className="h-[97%] w-full object-cover absolute top-0 left-0 z-1 bg-black/60 backdrop-blur-[5px]"
          />
        )}
        <div className="w-full h-[97%] absolute top-0 left-0 z-2 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        <p className="relative z-10 text-3xl md:text-4xl lg:text-7xl font-bold text-shadow-sm text-white">
          {title}
          <div className="bg-primary w-1/5 mx-auto h-1 mt-5 rounded-full"/>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={`w-full mx-auto my-10 px-5 py-10 md:px-8 lg:px-10 ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
