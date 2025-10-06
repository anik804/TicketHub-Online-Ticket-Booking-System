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
    <section className="w-full px-4 py-20  bg-gradient-to-b from-[#FFEFE6]/60 via-[#FFF8F3] to-[#FFF8F3]">
      {/* Heading */}
      <motion.h2
        className="pb-10 text-3xl md:text-4xl font-extrabold text-center
                   bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                   bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Our Trusted Partners
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {partners.map((p, i) => (
          <motion.div
            key={i}
            className="flex justify-center items-center bg-base-100 rounded-2xl shadow-sm
                       hover:shadow-lg transition-all duration-300 h-32 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-16 object-contain  hover:grayscale-0 transition duration-300"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
