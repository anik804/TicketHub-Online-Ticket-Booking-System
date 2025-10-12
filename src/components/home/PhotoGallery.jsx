"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaPhotoFilm } from "react-icons/fa6";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Array of photo URLs
export const photoUrls = [
  "https://img.freepik.com/free-photo/photorealistic-wedding-venue-with-intricate-decor-ornaments_23-2151481476.jpg",
  "https://img.freepik.com/free-photo/decorated-banquet-hall-with-flowers_8353-10058.jpg",
  "https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-music-concert-by-night-copy-space_637285-623.jpg",
  "https://img.freepik.com/free-photo/musicial-music-live-band-performing-stage-with-different-lights_627829-10055.jpg",
  "https://img.freepik.com/free-photo/wedding-reception-hall-with-elegant-table-setting-with-candles_181624-15206.jpg",
  "https://img.freepik.com/free-photo/sitting-people-watching-football-public-place-night_1268-18317.jpg",
  "https://img.freepik.com/free-photo/female-business-executive-giving-speech_107420-63797.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg",
  "https://img.freepik.com/free-photo/cheering-crowd-having-fun-music-festival-nightclub_53876-104261.jpg",
  "https://cdn.pixabay.com/photo/2016/08/16/09/53/international-conference-1597531_1280.jpg",
];

// PhotoGallery component
export default function PhotoGallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <section>
      {/* Heading */}
      <div
        className="relative w-full h-32 md:h-46 lg:h-50 bg-primary flex justify-center items-center p-15 overflow-hidden"
        style={{
          clipPath:
            "polygon(0 0,100% 0,100% calc(100% - 20px),calc(50% + 20px) calc(100% - 20px),50% 100%,calc(50% - 20px) calc(100% - 20px),0 calc(100% - 20px))",
        }}
      >
        <Image
          src={
            "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
          }
          alt="Gallery Photo"
          height={500}
          width={500}
          className="absolute bottom-0 left-0 z-1 w-full h-60 object-cover opacity-20"
        />
        <p className="relative z-10 text-3xl md:text-4xl lg:text-6xl font-bold text-shadow-xs text-white">
          Our Photo Gallery
        </p>
      </div>

      {/* Swiper Gallery */}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          400: { slidesPerView: 1 },
          770: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-[98%] mx-auto mt-12"
      >
        {photoUrls.map((photo, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <PhotoCard
              photo={photo}
              onClick={() => {
                setOpen(true);
                setCurrentIndex(index);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Lightbox */}
      <Lightbox
        open={open}
        index={currentIndex}
        close={() => setOpen(false)}
        slides={photoUrls.map((photo) => ({
          src: photo,
        }))}
      />
    </section>
  );
}

//Photo Card
export const PhotoCard = ({ photo, onClick }) => {
  return (
    <div
      className="relative w-full h-60 md:h-72 lg:h-80 overflow-hidden rounded-sm shadow-md group hover:shadow-xl transition-shadow duration-400 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={photo}
        alt="Gallery Photo"
        height={1000}
        width={1000}
        className="object-cover w-full h-full transform scale-105 group-hover:scale-100 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute top-0 left-0 z-10 w-full h-full scale-0 group-hover:scale-100 flex justify-center items-center bg-primary/85 transition-all duration-700 ease-in-out text-2xl md:text-4xl lg:text-5xl font-bold text-white">
        <span className="absolute top-10 left-10 size-12 border-l border-t border-white" />
        <span className="absolute bottom-10 right-10 size-12 border-r border-b border-white" />
        <FaPhotoFilm />
      </div>
    </div>
  );
};
