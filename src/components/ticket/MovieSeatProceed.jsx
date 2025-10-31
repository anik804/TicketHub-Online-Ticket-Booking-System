"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMovieTicket } from "@/hooks/useMovieTicket";
import { MdEventSeat } from "react-icons/md";

import { CalendarDays, Film, MapPin } from "lucide-react";
import MovieCheckout from "./MovieChekout";

export default function MovieSeatProceed({ seatLength, movieId, seats }) {
  const [isOpen, setIsOpen] = useState(false);

  const [currency, setCurrency] = useState("BDT");
  const [totalPrice, setTotalPrice] = useState(0);
  const [converting, setConverting] = useState(false);
  const currencies = ["BDT", "USD", "EUR", "GBP", "INR", "AUD", "CAD"];

  const { movieTicket, ticketLoading, ticketError, movieError } =
    useMovieTicket({
      movieId,
      seats,
      currency,
      totalPrice,
    });

  // Currency Conversion
  useEffect(() => {
    if (!movieTicket?.price) return;

    setConverting(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/5d75648c6024f50ca5e6c413/pair/BDT/${currency}/${movieTicket.price}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success")
          setTotalPrice(
            Number(
              data.conversion_result -
                (data.conversion_result * movieTicket.discount) / 100
            ).toFixed(2) * seatLength
          );
        else setTotalPrice(movieTicket.price * seatLength);
      })
      .catch(() => setTotalPrice(movieTicket.price * seatLength))
      .finally(() => setConverting(false));
  }, [currency, movieTicket?.price, seatLength]);

  return (
    <>
      <Button
        label={`Proceed to Ticket (${seatLength})`}
        disabled={seatLength === 0}
        onClick={() => setIsOpen(true)}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-xl shadow-2xl p-5 md:p-10 w-4/5 max-w-lg min-h-100 relative animate-slideUp overflow-hidden border border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 size-7 rounded-full border border-gray-300 flex justify-center items-center opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out bg-transparent hover:bg-base-300 cursor-pointer
              "
            >
              <AiOutlineClose size={18} />
            </button>
            {/* Content*/}

            <Image
              className="w-full h-50 object-cover rounded-lg mb-6"
              width={500}
              height={500}
              src={movieTicket.imageUrl}
              alt="ticket_image"
            />

            <h2 className="text-lg mb-3 flex items-center justify-center bg-primary rounded-md px-2 py-1 text-white">
              Ticket Information
            </h2>

            <div className="px-2 flex-1">
              <h1 className="flex items-center gap-2">
                <Film className="size-4" /> {movieTicket.name}
              </h1>
              <p className="flex items-center  gap-2 text-sm">
                <MapPin className="size-4" /> {movieTicket.location}
              </p>
              <p className="flex items-center  gap-2 text-sm">
                <CalendarDays className="size-4" />{" "}
                {movieTicket.eventDateTime || "Date not available"}
              </p>

              <p className="flex items-center  gap-2 mt-3 mb-6 text-sm">
                <MdEventSeat className="size-4" />{" "}
                {movieTicket.seats.map((seat) => (
                  <span
                    className="py-1 px-2 rounded-sm border text-green-800 bg-green-300 border-green-800"
                    key={seat}
                  >
                    {seat}
                  </span>
                ))}
              </p>

              <div className="flex items-center justify-between gap-2 mt-4 mb-2">
                <p className="text-lg">
                  Total Price :{" "}
                  {converting ? "Converting..." : `${currency} ${totalPrice}`}
                  {movieTicket.discount > 0 && (
                    <p className="text-xs">
                      <span className="font-semibold">
                        {movieTicket.discount}%
                      </span>{" "}
                      discount applied
                    </p>
                  )}
                </p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border border-primary/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-center">
                <MovieCheckout
                  movieTicket={movieTicket}
                  disabled={converting}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
