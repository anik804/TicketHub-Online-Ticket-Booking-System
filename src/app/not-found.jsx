"use client";
import error from '../../public/error.json';
import React from "react";
import Lottie from "lottie-react";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col my-10  items-center justify-center min-h-screen bg-gradient-to-b from-white via-orange-50 to-red-50   px-6 text-center">
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
        className="mt-6 btn bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-red-600 transition-all duration-300 hover:scale-105"
      >
        🔙 Back to Home
      </button>
    </div>
  );
}
