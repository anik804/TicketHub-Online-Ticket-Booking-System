"use client";

import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { motion } from "motion/react";
import HomeLayer from "@/ui/HomeLayer";

export default function CustomerTestimonials() {
  // Dummy review data
  const reviews = [
    {
      id: 1,
      name: "Raju Kader",
      photo: "https://i.pravatar.cc/300?img=1",
      rating: 5,
      review: "“The booking experience was smooth and easy. Loved the event!”",
    },
    {
      id: 2,
      name: "Rahim Ahmed",
      photo: "https://i.pravatar.cc/300?img=2",
      rating: 4,
      review: "“Affordable tickets and very user-friendly system.”",
    },
    {
      id: 3,
      name: "Riya Chowdhury",
      photo: "https://i.pravatar.cc/300?img=3",
      rating: 5,
      review: "“Best ticket booking site I’ve ever used. Highly recommended!”",
    },
    {
      id: 4,
      name: "Karim Khan",
      photo: "https://i.pravatar.cc/300?img=4",
      rating: 4,
      review: "“Quick checkout process and great offers available.”",
    },
    {
      id: 5,
      name: "Emily Brown",
      photo: "https://i.pravatar.cc/300?img=5",
      rating: 5,
      review: "“I loved how fast I got my e-ticket with QR code.”",
    },
    {
      id: 6,
      name: "David Smith",
      photo: "https://i.pravatar.cc/300?img=6",
      rating: 3,
      review: "“Good platform but could use more payment options.”",
    },
    {
      id: 7,
      name: "Fatima Noor",
      photo: "https://i.pravatar.cc/300?img=7",
      rating: 5,
      review: "“Amazing discounts! I saved a lot booking early.”",
    },
    {
      id: 8,
      name: "John Wilson",
      photo: "https://i.pravatar.cc/300?img=8",
      rating: 4,
      review: "“Easy navigation, nice UI, and reliable service.”",
    },
    {
      id: 9,
      name: "Maya Ali",
      photo: "https://i.pravatar.cc/300?img=9",
      rating: 5,
      review: "“Loved the seamless process and quick customer support.”",
    },
    {
      id: 10,
      name: "Carlos Mendes",
      photo: "https://i.pravatar.cc/300?img=10",
      rating: 4,
      review: "“Convenient and trustworthy ticket booking site.”",
    },
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <HomeLayer title="Customer Testimonials">
      <Slider className="py-2 review-slick" {...settings}>
        {reviews.map((item, index) => (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: index < 5 ? (index + 1) * 0.4 : 0.8,
              ease: "easeInOut",
            }}
            key={item.id}
            className="py-2 px-3"
          >
            <div className="bg-base-200 border border-secondary/30 flex items-center flex-col rounded-2xl shadow-md p-5 text-center h-58 hover:-translate-y-2 custom-transition">
              <Image
                src={item.photo}
                alt={item.name}
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded-full mx-auto mb-3 shadow-sm"
              />
              <h2 className="font-bold text-lg">{item.name}</h2>
              <div className="flex justify-center my-2">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-amber-400" />
                ))}
              </div>
              <p className="text-secondary italic line-clamp-2">
                {item.review}
              </p>
            </div>
          </motion.div>
        ))}
      </Slider>
    </HomeLayer>
  );
}
