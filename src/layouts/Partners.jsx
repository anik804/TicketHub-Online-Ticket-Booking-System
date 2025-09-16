"use client";

import { motion } from "framer-motion";

export default function Partners() {
  const partners = [
    { name: "AirlineX", logo: "/airasia.jpg" },
    { name: "BusLine", logo: "/busline.jpg" },
    { name: "MovieHub", logo: "/moviehub.jpg" },
    { name: "ConcertPro", logo: "/concertpro.jpg" },
  ];

  return (
    <section className="w-full px-4 py-20 bg-[#000000] text-white">
      {/* Animated Heading */}
      <motion.h1
        className="pb-10 text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        animate={{
          color: ["#000000", "#3D0000", "#950101", "#FF0000", "#000000"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        Partners & Trusted By
      </motion.h1>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {partners.map((p, i) => (
          <motion.div
            key={i}
            className="p-6 bg-[#3D0000] border border-[#95010133] rounded-xl shadow-md flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{
              scale: 1.08,
              rotate: 1,
              boxShadow: "0px 10px 30px rgba(255,0,0,0.4)",
            }}
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-20 object-contain bg-[#FF000011] p-3 rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
