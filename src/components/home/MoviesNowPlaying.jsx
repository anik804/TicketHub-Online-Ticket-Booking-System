"use client";
import React from "react";
import HomeLayer from "@/ui/HomeLayer";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "motion/react"
import Link from "next/link";
import Button from "@/ui/Button";
import Image from "next/image";

const movies = [
  {
    title: "Wicked : For Good",
    imageUrl: "https://www.movieposters.com/cdn/shop/files/wicked_for_good_ver5.jpg",
    category: ["Action", "Sci-Fi"],
    runtime: 143,
  },
  {
    title: "Dark Knight",
    imageUrl: "https://www.movieposters.com/cdn/shop/files/if-i-had-legs-id-kick-you_vhwqq9e0.jpg",
    category: ["Action", "Adventure"],
    runtime: 181,
  },
  {
    title: "Tron : Ascension",
    imageUrl: "https://www.movieposters.com/cdn/shop/files/tron-ares_loz0dwg7_f54f2804-2cd2-43f2-a9bd-e88635acc25c.jpg",
    category: ["Sci-Fi", "Thriller"],
    runtime: 150,
  },
  {
    title: "Goat",
    imageUrl: "https://www.movieposters.com/cdn/shop/files/goat_btrfqhqn.jpg",
    category: ["Action", "Adventure"],
    runtime: 121,
  },
];

export default function MoviesNowPlaying() {
  return (
    <HomeLayer
      title={"Movies Now Playing"}
      icon={<MdLocalMovies />}
      subtitle={"Watch New Movies"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 md:px-10 lg:px-15">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </HomeLayer>
  );
}

export const MovieCard = ({ movie }) => {
  return (
      <div
      className="w-full h-100 md:h-120 p-[5px] bg-transparent hover:bg-orange-700/80 transition-all duration-600 ease-in-out rounded">
        <Link href={`/movies/${movie.title}`} className="w-full h-full bg-black flex items-end pb-5 lg:pb-8 rounded relative group overflow-hidden">

        <Image
          src={movie.imageUrl}
          alt={movie.title}
          width={500}
          height={500}
          className="absolute top-0 left-0 z-1 w-full h-full object-cover rounded scale-105 group-hover:scale-100 transition-all duration-600 ease-in-out"
        />

        <div className="w-full h-full absolute top-0 left-0 z-2 bg-gradient-to-b from-transparent to-[80%] to-black/90"/>


        <div className="text-white px-5 lg:px-8 z-3">
        <p className="text-sm mb-2">{movie.category.map((category) => category).join(", ")} / {movie.runtime} min</p>
        <p className="text-xl md:text-2xl font-semibold mb-5">{movie.title}</p>

         <button className="h-10 px-5 text-sm font-semibold bg-white group-hover:bg-primary text-gray-600 group-hover:text-white transition-all duration-700 ease-in-out rounded">
         Get Ticket
         </button>
        </div>
        </Link>
      </div>
  );
};
