"use client";
import error from '../../public/error.json';
import React from "react";
import Lottie from "lottie-react";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* 🎥 Lottie Animation */}
      <div id="book-lottie">
        <Lottie
          animationData={error}
          loop={true}
          autoplay={true}
          style={{ width: 500, height: 400 }}
        ></Lottie>
      </div>

      {/* 📝 Text Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-6">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 text-lg max-w-md mt-4">
        The page you’re looking for doesn't exist.
      </p>

      {/* 🔙 Go Back Button */}
      <button
        onClick={() => router.push("/")}
        className="px-6 sm:px-8 py-3 btn bg-[#d96c2c] text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-[#b45720] transition-all duration-300 shadow-lg mt-6"
      >
         Back to Home
      </button>
    </div>
  );
}
