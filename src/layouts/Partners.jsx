"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      id: 1,
      name: "AirAsia",
      logo: "/partners/airasia.avif",
      desc: "Trusted airline partner ensuring smooth travel experiences.",
    },
    {
      id: 2,
      name: "Shohoz Bus",
      logo: "/partners/busline.avif",
      desc: "Leading transport provider for convenient intercity journeys.",
    },
    {
      id: 3,
      name: "Star Cineplex",
      logo: "/partners/moviehub.jpg",
      desc: "Bangladesh’s top cinema chain for ultimate movie experiences.",
    },
    {
      id: 4,
      name: "LiveNation",
      logo: "/partners/concertpro.jpg",
      desc: "Global leader in live concerts and entertainment events.",
    },
  ];

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      {/* 🎨 Background */}
      {/* <div className="absolute inset-0 -z-10">
        <Image
          src="/exploreCategories.jpg"
          alt="background texture"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white" />
      </div> */}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ✨ Title */}
        <div className="text-center mb-14">
          <p className="text-[#d96c2c] font-medium uppercase tracking-wide">
            Collaborations
          </p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Trusted Partners
          </motion.h2>

          <motion.p
            className="text-gray-600 text-center pt-5 mb-16 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Proudly working with top brands to bring you the best travel and
            entertainment experiences.
          </motion.p>
        </div>

        {/* 🧩 Cards (same as Category Section design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative w-full h-[350px] rounded overflow-hidden shadow-xl hover:shadow-2xl border-4 border-[#d96c2c]transition-all duration-500"
            >
              {/* Background Image */}
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <h3 className="text-2xl font-semibold mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4">
                  {partner.desc}
                </p>

                <button className="px-6 py-2 text-sm font-semibold bg-white text-gray-900 rounded shadow hover:bg-[#d96c2c] hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
