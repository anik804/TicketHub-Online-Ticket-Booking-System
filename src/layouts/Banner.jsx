"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
      bg: "https://images.unsplash.com/photo-1611550082883-a65b37a8ea89?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHRpY2tldCUyMGF2YWlsYWJpbGl0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    },
    {
      title: "Join Exciting Concerts & Festivals",
      desc: "From music nights to sports events — book and enjoy the experience live.",
      bg: "https://images.unsplash.com/photo-1619229724813-32decfc1c345?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZlc3RpdmFscyUyMGFuZCUyMGNvbmNlcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=6000",
    },
  ];

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center text-white px-4 sm:px-8 md:px-16 max-w-3xl"
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                  {slide.desc}
                </p>
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
