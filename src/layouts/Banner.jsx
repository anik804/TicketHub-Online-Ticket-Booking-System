"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  const slides = [
    {
      title: "Book Your Tickets Anytime 🎟️",
      desc: "Hassle-free online ticket booking with instant confirmation.",
      img: "https://images.unsplash.com/photo-1587135325273-adef4e88bc25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRpY2tldCUyMGJvb2tpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Exclusive Offers 💸",
      desc: "Save big with our seasonal discounts and flash sales!",
      img: "https://images.unsplash.com/photo-1623068285726-21b0fcabe7f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHRpY2tldCUyMGJvb2tpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Fast & Secure Checkout 🔒",
      desc: "Enjoy a smooth booking experience with secure payments.",
      img: "https://images.unsplash.com/photo-1617976166080-c8f997ccc237?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        loop={true}
        className="w-full h-[500px] md:h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 h-full
                            bg-gradient-to-b from-[#1a0000] via-[#4B0000] to-[#FF0000] text-white
                            shadow-2xl overflow-hidden"
            >

            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 h-full bg-gradient-to-b from-black via-[#4B0000] to-[#FF0000] text-white shadow-2xl overflow-hidden">

              {/* Text Section */}
              <div className="text-center md:text-left space-y-6 max-w-lg flex-1">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base md:text-xl opacity-90">{slide.desc}</p>
                <Link
                  href="/browse-events"
                  className="inline-block bg-white text-black px-6 py-3 rounded-2xl font-semibold text-lg shadow-md hover:scale-105 hover:bg-gray-200 transition-all duration-300"
                >
                  Browse Events
                </Link>
              </div>

              {/* Image Section */}
              <div className="flex justify-center md:justify-end w-full md:w-1/2">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  width={400}
                  height={400}
                  className="drop-shadow-2xl object-cover rounded-xl"
                  unoptimized
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
