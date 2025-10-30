"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Banner() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Playfair+Display:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const slides = [
    {
      title: "Discover & Book Instantly For Sports",
      desc: "Experience seamless ticket booking with live event updates — anytime, anywhere.",
      bg: "https://i.ibb.co.com/gZYZX7vK/jannes-glas-0-Na-QQs-LWLk-A-unsplash.jpg",
    },
    {
      title: "Real-Time Ticket Updates For Movies",
      desc: "Get live seat availability and instant confirmations for your favorite shows.",
      bg: "https://i.ibb.co/hF2fzMW8/jake-hills-23-LET4-Hxj-U-unsplash.jpg",
    },
    {
      title: "Join Concerts & Events",
      desc: "From music nights to sports events — book and enjoy the experience live.",
      bg: "https://i.ibb.co.com/FbdzVq4J/med-mhamdi-m-H-E0-K581-Yk-unsplash.jpg",
    },
  ];

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden font-[Poppins]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center text-white px-6 sm:px-10 md:px-20 max-w-3xl"
              >
                {/* Typewriter Title */}
                <h1 className="text-3xl sm:text-3xl md:text-4xl font-[Playfair_Display] font-extrabold mb-4 uppercase tracking-wide text-orange-500">
                  <TypeAnimation
                    sequence={[slide.title, 3000, ""]}
                    speed={60}
                    deletionSpeed={40}
                    repeat={Infinity}
                    wrapper="span"
                  />
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-white mb-8 italic leading-relaxed max-w-2xl mx-auto">
                  {slide.desc}
                </p>

                {/* Animated Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 10px #f97316",
                        "0 0 25px #f97316",
                        "0 0 10px #f97316",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-block rounded-full"
                  >
                    <Link
                      href="/browse-events"
                      className="block px-8 py-2 sm:px-10 sm:py-3 bg-[#f97316] text-white font-semibold text-base sm:text-lg rounded-full hover:bg-white hover:text-[#f97316] transition-all duration-300 shadow-lg"
                    >
                      Browse Events
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
