"use client";
import React from "react";
import HomeLayer from "@/ui/HomeLayer";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "motion/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const movies = [
  {
    title: "Wicked : For Good",
    imageUrl:
      "https://www.movieposters.com/cdn/shop/files/wicked_for_good_ver5.jpg",
    category: ["Action", "Sci-Fi"],
    runtime: 143,
  },
  {
    title: "Dark Knight",
    imageUrl:
      "https://www.movieposters.com/cdn/shop/files/if-i-had-legs-id-kick-you_vhwqq9e0.jpg",
    category: ["Action"],
    runtime: 181,
  },
  {
    title: "Tron : Ascension",
    imageUrl:
      "https://www.movieposters.com/cdn/shop/files/tron-ares_loz0dwg7_f54f2804-2cd2-43f2-a9bd-e88635acc25c.jpg",
    category: ["Sci-Fi", "Thriller"],
    runtime: 150,
  },
  {
    title: "Goat",
    imageUrl: "https://www.movieposters.com/cdn/shop/files/goat_btrfqhqn.jpg",
    category: ["Action", "Adventure"],
    runtime: 121,
  },
  {
    title: "Home Alone",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/homealone.124915_500x749.jpg",
    category: ["Action", "Crime"],
    runtime: 141,
  },
  {
    title: "Bad Boys",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/Badboys2.24x36_500x749.jpg",
    category: ["Action", "Adventure"],
    runtime: 130,
  },
  {
    title: "National Lampoon",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0057/3728/3618/files/66d3eedf796dda113fbeb00434dded5f_567e1791-ebce-41c4-9af2-98e47367a3bd_500x749.jpg",
    category: ["Action", "Adventure"],
    runtime: 130,
  },
];

export default function MoviesNowPlaying() {
  return (
    <HomeLayer
      title={"Movies Now Playing"}
      icon={<MdLocalMovies />}
      subtitle={"Watch New Movies"}
    >
      <div className="px-5 md:px-10 lg:px-15">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-112 lg:h-122"
          breakpoints={{
            400: { slidesPerView: 1 },
            770: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index} className="h-full">
              <MovieCard movie={movie} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </HomeLayer>
  );
}

export const MovieCard = ({ movie, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group w-full h-100 lg:h-110 p-1 bg-green hover:bg-primary transition-all duration-600 ease-in-out rounded hover:shadow-md overflow-hidden"
    >
      <Link
        href={`/movies/${movie.title}`}
        className="w-full h-full flex items-end pb-5 lg:pb-8 rounded relative overflow-hidden"
      >
        <Image
          src={movie.imageUrl}
          alt={movie.title}
          width={500}
          height={500}
          className="absolute top-0 left-0 z-1 w-full h-full object-cover rounded scale-106 group-hover:scale-100 transition-all duration-600 ease-in-out"
        />

        <div className="w-full h-full absolute top-0 left-0 z-2 bg-gradient-to-b from-transparent to-[80%] to-black/90" />

        <div className="text-white px-5 lg:px-8 z-3">
          <p className="text-sm mb-2">
            {movie.category.map((category) => category).join(", ")} /{" "}
            {movie.runtime} min
          </p>
          <p className="text-xl md:text-2xl font-semibold mb-5">
            {movie.title}
          </p>

          <button className="h-10 px-5 text-sm font-semibold bg-white group-hover:bg-primary text-gray-600 group-hover:text-white transition-all duration-700 ease-in-out rounded text-shadow-2xs">
            Get Ticket
          </button>
        </div>
      </Link>
    </motion.div>
  );
};
