"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-6 md:px-16">
      
      {/* Page Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3
                       bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                       bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Learn more about our mission, values, and the team behind the ultimate e-ticket booking platform.
        </p>
      </motion.div>

      {/* Two Column Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 max-w-7xl mx-auto">
        
        {/* Left Image */}
        <motion.div
          className="md:w-1/2 relative h-80 md:h-[400px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://i.ibb.co/LhQWGthL/yves-moret-3v-SGseo-Qj40-unsplash.jpg"
            alt="About us"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-100">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg md:text-lg">
            We aim to provide a seamless, fast, and secure online ticket booking experience for all kinds of events. From concerts to tech expos, our platform ensures you never miss out!
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-100">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
            <li>Transparency in pricing and offers</li>
            <li>Customer-first approach</li>
            <li>Fast and secure checkout process</li>
            <li>Innovative solutions for event-goers</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-100">
            Our Team
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            A passionate group of developers, designers, and event enthusiasts working together to make ticket booking effortless and enjoyable.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-extrabold mb-4
                       bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                       bg-clip-text text-transparent">
          Join Us Today!
        </h3>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
          Be part of our community and never miss an event again.
        </p>
        <a
          href="/browse-events"
          className="inline-block bg-gradient-to-r from-[#950101] to-[#FF0000]
                     text-white font-semibold px-6 py-3 rounded-md shadow-md transition hover:opacity-90"
        >
          Browse Events
        </a>
      </motion.div>
    </section>
  );
}
