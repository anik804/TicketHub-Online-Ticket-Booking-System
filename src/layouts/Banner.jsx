"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Link from "next/link";

export default function Banner() {
  const slides = [
    {
      id: 1,
      bg: "https://images.unsplash.com/photo-1652018440238-1aeb20a803a7?w=1600&auto=format&fit=crop&q=60",
      title: "🎟️ Book Your Tickets Anytime",
      desc: "Hassle-free online ticket booking with instant confirmation.",
      thumbs: [
        "https://images.unsplash.com/photo-1531686264889-56fdcabd163f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1642784353782-91bfdd65920c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1498192467103-290f567eb3a3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxldmVudHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      ],
    },
    {
      id: 2,
      bg: "https://images.unsplash.com/photo-1612733374229-51b4b6bd1960?w=1600&auto=format&fit=crop&q=60",
      title: "💸 Exclusive Offers",
      desc: "Save big with our seasonal discounts and flash sales!",
      thumbs: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1601601392622-5d18104a78fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      ],
    },
    {
      id: 3,
      bg: "https://images.unsplash.com/photo-1617976166080-c8f997ccc237?w=1600&auto=format&fit=crop&q=60",
      title: "🔒 Fast & Secure Checkout",
      desc: "Enjoy a smooth booking experience with secure payments.",
      thumbs: [
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        "https://images.unsplash.com/photo-1670028514318-0ac718c0590d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      ],
    },
  ];

  return (
    <section className="relative w-full h-[80vh] sm:h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Main Background Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="absolute inset-0">
              <Image
                src={slide.bg}
                alt="Background"
                fill
                priority
                className="object-cover brightness-50"
              />
            </div>

            {/* Content Container */}
            <div className="relative w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 text-white">
              {/* Main Text */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg"
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6">
                  {slide.desc}
                </p>
                <Link href={'/browse-events'} className="bg-white btn lg:text-lg hover:scale-105 text-black mb-20  hover:bg-[#d96c2c] text-base sm:text-sm px-5 sm:px-6 py-2 sm:py-3 rounded font-semibold shadow-md transition duration-300">
                  Browse Events
                </Link>
              </motion.div>

              {/* Thumbnail Slider */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-4  sm:bottom-6 md:bottom-10 right-4 sm:right-6 md:right-10 bg-black/40 p-2 sm:p-4 rounded-lg backdrop-blur-md"
              >
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 2000 }}
                  slidesPerView={3}
                  breakpoints={{
                    640: { slidesPerView: 1 }, // sm
                    768: { slidesPerView: 2 }, // md
                    1024: { slidesPerView: 3 }, // lg
                  }}
                  spaceBetween={8}
                  loop
                  className="w-[200px] sm:w-[250px] md:w-[300px]"
                >
                  {slide.thumbs.map((thumb, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative w-[70px] sm:w-[80px] md:w-[90px] h-[50px] sm:h-[60px] md:h-[70px] overflow-hidden rounded-md">
                        <Image
                          src={thumb}
                          alt="thumb"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
