"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partners = [
    {
      id: 1,
      name: "AirAsia",
      logo: "/partners/airasia.avif",
      desc: "Trusted airline partner ensuring smooth travel experiences.",
      details:
        "AirAsia has been a reliable airline partner since 2020, providing exclusive flight offers and seamless booking experiences for our users.",
      website: "https://www.airasia.com",
    },
    {
      id: 2,
      name: "Shohoz Bus",
      logo: "/partners/busline.avif",
      desc: "Leading transport provider for convenient intercity journeys.",
      details:
        "Shohoz Bus ensures comfortable and affordable intercity travel. Our partnership allows users to book bus tickets directly through our platform.",
      website: "https://www.shohoz.com",
    },
    {
      id: 3,
      name: "Star Cineplex",
      logo: "/partners/moviehub.jpg",
      desc: "Bangladesh’s top cinema chain for ultimate movie experiences.",
      details:
        "Star Cineplex brings the best cinematic experiences to movie lovers. Together, we promote exclusive screenings and online ticketing.",
      website: "https://www.starcineplexbd.com",
    },
    {
      id: 4,
      name: "LiveNation",
      logo: "/partners/concertpro.jpg",
      desc: "Global leader in live concerts and entertainment events.",
      details:
        "LiveNation connects fans with global artists and concerts. Our collaboration helps users discover and attend their favorite live events.",
      website: "https://www.livenation.com",
    },
  ];

  return (
    <section className="relative py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="text-[#d96c2c] font-medium uppercase tracking-wide">
            Collaborations
          </p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Trusted Partners
          </motion.h2>
          <motion.p
            className="text-gray-500 text-center pt-5 mb-16 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Proudly working with top brands to bring you the best travel and
            entertainment experiences.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative w-full h-[350px] rounded overflow-hidden shadow-xl hover:shadow-2xl border-4 border-[#d96c2c] transition-all duration-500"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
                <h3 className="text-2xl font-semibold mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4">{partner.desc}</p>

                <button
                  onClick={() => setSelectedPartner(partner)}
                  className="px-6 py-2 text-sm font-semibold bg-white text-gray-900 rounded shadow hover:bg-[#d96c2c] hover:text-white transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

         {/* Modal  */}
        {selectedPartner && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
            <div className="bg-white border-4 border-[#d96c2c] rounded max-w-lg w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

              <Image
                src={selectedPartner.logo}
                alt={selectedPartner.name}
                width={100}
                height={100}
                className="mx-auto rounded-md mb-4"
              />
              <h3 className="text-2xl text-gray-500 font-bold text-center mb-2">
                {selectedPartner.name}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {selectedPartner.details}
              </p>
              <div className="text-center">
                <a
                  href={selectedPartner.website}
                  target="_blank"
                  className="inline-block bg-[#d96c2c] text-white px-5 py-2 rounded font-medium hover:bg-[#b55621] transition-all"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
