"use client";

import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMovieTicket } from "@/hooks/useMovieTicket";
import { MdEmail, MdEventSeat } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { CalendarDays, Film, MapPin, MoveIcon, Ticket } from "lucide-react";
import CheckoutButton from "./CheckoutButton";

export default function MovieSeatProceed({ seatLength, eventId, seats }) {
  const [isOpen, setIsOpen] = useState(false);

  const currency = "USD";
  const convertedPrice = 10;

  const { movieTicket, ticketLoading, ticketError, movieError } =
    useMovieTicket({
      eventId,
      seats,
      currency,
      convertedPrice,
    });

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
                <Film className="size-4" /> {movieTicket.title}
              </h1>
              <p className="flex items-center  gap-2 text-sm">
                <MapPin className="size-4" /> {movieTicket.location}
              </p>
              <p className="flex items-center  gap-2 text-sm">
                <CalendarDays className="size-4" />{" "}
                {movieTicket.date || "Date not available"}
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

              <div className="flex items-center justify-center">
              <CheckoutButton ticket={movieTicket} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
