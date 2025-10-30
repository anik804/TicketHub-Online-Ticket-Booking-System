"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function MovieDetailsClient({ movie }) {
  const { data: session } = useSession();
  const user = session?.user;

  const title = movie.name;
  const [readMore, setReadMore] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const toggleReadMore = () => setReadMore(!readMore);

  // Check if movie is already wishlisted
  useEffect(() => {
    if (!user) return;
    async function fetchWishlist() {
      try {
        const res = await fetch(`/api/wishlist/${user.id}`);
        if (!res.ok) return;
        const data = await res.json();
        const isWishlisted = data.some((m) => m._id === movie._id);
        setWishlisted(isWishlisted);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    }
    fetchWishlist();
  }, [user, movie._id]);

  const handleWishlist = async () => {
    if (!user) return toast.error("Please login to add to wishlist");

    try {
      const res = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, movieId: movie._id }),
      });
      const data = await res.json();
      if (res.ok) {
        setWishlisted(true);
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="bg-base-100">
      <Toaster position="top-right" />
      {/* Banner */}
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('${movie.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]" />
        <motion.div className="relative z-10" initial="hidden" animate="visible">
          <p className="text-gray-300 mb-2 text-lg md:text-xl tracking-wide">
            Home / Movies / {movie.name}
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white flex justify-center gap-2 overflow-hidden">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                transition={{ delay: index * 0.05 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      </div>

      <div className="w-full pt-2 border-b-6 border-dashed border-black mb-8"></div>

      {/* Movie Details Section */}
      <div className="max-w-6xl mx-auto p-8 bg-base rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          {/* Left: Movie Image */}
          <div className="w-full h-full relative rounded-lg overflow-hidden flex items-stretch">
            <Image
              src={movie.imageUrl}
              alt={movie.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right: Movie Info */}
          <div className="flex flex-col justify-between h-full">
            <div className="flex-1">
              <h2 className="text-3xl text-gray-600 font-bold mb-4">{movie.name}</h2>
              <p className="text-gray-600 mb-2">
                {movie.category} / {movie.duration}
              </p>
              <p className="text-gray-600 mb-2">
                Director: {movie.director} | Writer: {movie.writer}
              </p>
              <p className="text-gray-600 mb-2">Language: {movie.language}</p>
              <p className="text-gray-600 mb-2">Location: {movie.location}</p>
              <p className="text-gray-600 mb-2">
                Date: {movie.date} | Time: {movie.time}
              </p>
              <p className="text-gray-600 mb-4">Ticket Price: ৳{movie.ticketPrice}</p>

              {/* Description */}
              <div className="mb-4">
                <h3 className="text-xl text-gray-600 font-semibold mb-2">Description</h3>
                <p className="text-gray-600">
                  {readMore ? movie.description : `${movie.description.slice(0, 150)}...`}
                  {movie.description.length > 150 && (
                    <button
                      onClick={toggleReadMore}
                      className="ml-2 text-primary font-semibold hover:underline"
                    >
                      {readMore ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              {/* Buy Ticket */}
              <button className="px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-orange-400 transition w-max">
                Buy Ticket
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                disabled={wishlisted}
                className={`px-8 py-3 font-semibold rounded transition w-max ${
                  wishlisted
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : "bg-primary text-white hover:bg-orange-400"
                }`}
              >
                {wishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
