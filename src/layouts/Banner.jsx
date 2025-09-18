"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "🎟️ Book Your Tickets Anytime",
    desc: "Hassle-free online ticket booking with instant confirmation.",
    img: "https://images.unsplash.com/photo-1652018440238-1aeb20a803a7?w=1600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "💸 Exclusive Offers",
    desc: "Save big with our seasonal discounts and flash sales!",
    img: "https://images.unsplash.com/photo-1612733374229-51b4b6bd1960?w=1600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "🔒 Fast & Secure Checkout",
    desc: "Enjoy a smooth booking experience with secure payments.",
    img: "https://images.unsplash.com/photo-1617976166080-c8f997ccc237?w=1600&auto=format&fit=crop&q=60",
  },
];

export default function Banner() {
  return (
    <section className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={4000}
        stopOnHover={false}
        swipeable
        emulateTouch
        className="text-white"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Animated Text Content */}
            <motion.div
              className="relative z-10 text-center max-w-2xl px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mt-4 opacity-90 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {slide.desc}
              </motion.p>

              <motion.button
                className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold text-lg shadow-md hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Browse Events
              </motion.button>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
