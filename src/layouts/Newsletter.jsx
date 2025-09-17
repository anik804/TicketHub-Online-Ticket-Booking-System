"use client";

import { useState } from "react";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter a valid email.");
    console.log("Subscribed with:", email); // Replace with API call
    alert("✅ Thank you for subscribing!");
    setEmail("");
  };

  return (
<section className="relative text-white py-16 my-10 bg-gradient-to-br ">
  {/* ✅ Container for proper alignment */}
  <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
    {/* ✅ Section Title */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        📰 Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 text-lg mt-3">
        Get the latest event updates, early access to tickets, and special discounts — straight to your inbox!
      </p>
    </div>

    {/* ✅ Main Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Image Section */}
      <div className="flex justify-center md:justify-end">
        <Image
          src="https://images.unsplash.com/photo-1538905386057-4a5a580c45a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c2xldHRlciUyMGZvciUyMHRpY2tldCUyMGJvb2tpbmd8ZW58MHx8MHx8fDA%3D"
          alt="Newsletter Illustration"
          width={400}
          height={400}
          className="rounded-2xl drop-shadow-2xl object-cover"
          unoptimized
        />
      </div>

      {/* Right Content Section */}
      <div className="text-center md:text-left space-y-6">
        <h3 className="text-2xl md:text-3xl font-bold text-black">
          🎉 Stay Updated with Our Latest Events
        </h3>
        <p className="text-lg opacity-90 text-gray-600">
          Subscribe to get event notifications, special offers, and early access
          to exclusive tickets.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl text-black text-lg focus:outline-none focus:ring-4 focus:ring-red-400"
            required
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold text-lg shadow-md relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gray-200"
          >
            <span className="relative z-10">Subscribe</span>
            <span className="absolute inset-0 rounded-2xl bg-red-500 opacity-0 hover:opacity-20 transition-opacity duration-500"></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>


  );
}
