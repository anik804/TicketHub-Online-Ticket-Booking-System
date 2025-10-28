"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Banner() {
  const slides = [
    {
      title: "Discover & Book Events Instantly",
      desc: "Experience seamless ticket booking with live event updates — anytime, anywhere.",
      bg: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1400&auto=format&fit=crop&q=80",
    },
    {
      title: "Real-Time Ticket Availability",
      desc: "Get live seat updates and instant confirmations for your favorite shows.",
      bg: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      title: "Join Exciting Concerts & Festivals",
      desc: "From music nights to sports events — book and enjoy the experience live.",
      bg: "https://images.unsplash.com/photo-1619229724813-32decfc1c345?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZlc3RpdmFscyUyMGFuZCUyMGNvbmNlcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=6000",
    },
  ];

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 300 },
    }),
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

              {/* Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center text-white px-4 sm:px-8 md:px-16 max-w-3xl"
              >
                {/* Animated Title with typography styles */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg tracking-wide uppercase">
                  {slide.title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      className="mr-2 inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                {/* Animated Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-sm sm:text-base md:text-lg mb-8 text-white/90 leading-relaxed italic tracking-tight"
                >
                  {slide.desc}
                </motion.p>

                {/* Button */}
                <Link
                  href={"browse-events"}
                  className="px-6 sm:px-8 py-3 bg-[#d96c2c] text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-[#b45720] transition-all duration-300 shadow-lg"
                >
                  Browse Events
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
