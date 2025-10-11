"use client";
import React from "react";
import HomeLayer from "@/ui/HomeLayer";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const partners = [
  {
    name: "threecket",
    imgUrl: "/images/partners/3cket.png",
  },
  {
    name: "eventbrite",
    imgUrl: "/images/partners/1930961.png",
  },
  {
    name: "bandwango",
    imgUrl: "/images/partners/bandwango.svg",
  },
  {
    name: "eventify",
    imgUrl: "/images/partners/eventify.svg",
  },
  {
    name: "zoonga",
    imgUrl: "/images/partners/zoonga.png",
  },
  {
    name: "sched",
    imgUrl: "/images/partners/sched.svg",
  },
  {
    name: "tickespice",
    imgUrl: "/images/partners/tickespice.svg",
  },
  {
    name: "ticketleap",
    imgUrl: "/images/partners/TL-logo.svg",
  },
  {
    name: "vfairs",
    imgUrl: "/images/partners/vfairs.svg",
  },
];

export default function RollingPartners() {
  return (
    <HomeLayer>
      <div className="px-5 md:px-10 lg:px-15">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 1500 }}
          className="w-full"
          breakpoints={{
            400: { slidesPerView: 2 },
            770: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="w-full py-1">
              <PartnerCard partner={partner} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </HomeLayer>
  );
}

export const PartnerCard = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-auto py-10 px-5 border border-gray-200 rounded flex flex-col items-center justify-between shadow-xs"
    >
      <Image
        src={partner.imgUrl}
        alt={partner.name}
        width={500}
        height={500}
        className="w-full h-20 object-contain"
      />
      <div className="capitalize font-semibold text-gray-500">
        {partner.name}
      </div>
    </motion.div>
  );
};
