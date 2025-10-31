"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Image from "next/image";
import { MapPin, CalendarDays, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Button from "@/ui/Button";

import { useMovieData } from "@/hooks/useMovieData";
import MovieSeatProceed from "@/components/ticket/MovieSeatProceed";
import { useMoviePayment } from "@/hooks/useMoviePayment";
import Link from "next/link";

export default function MovieTicketPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [seats, setSeats] = useState([]);
  const [booked, setBooked] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const { movieData, movieLoading, movieError } = useMovieData(id);

  // 🔹 Generate A–Z seat layout (20 per row)
  const generateSeatLayout = (total = 100) => {
    const layout = [];
    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let count = 1;
    for (let r = 0; r < rows.length && count <= total; r++) {
      for (let c = 1; c <= 20 && count <= total; c++) {
        layout.push(`${rows[r]}${c}`);
        count++;
      }
    }
    return layout;
  };

  const { paymentHistory } = useMoviePayment({ movieId: id });

  // 🔹 Load transactions periodically
  useEffect(() => {
    if (!id) return;

    async function loadTransactions() {
      try {
        setLoading(true);

        const paidSeats = paymentHistory
          .filter((t) => t?.status === "PAID")
          .flatMap((t) => t?.seats || []);

        setBooked(paidSeats);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    // Initial fetch + auto refresh
    loadTransactions();
    const interval = setInterval(loadTransactions, 5000);
    setSeats(generateSeatLayout(movieData?.totalSeats || 100));

    return () => clearInterval(interval);
  }, [paymentHistory, movieData?.totalSeats]);

  // 🔹 Seat selection handler
  const toggleSeat = (seat) => {
    if (booked.includes(seat)) return toast.error("Seat already booked!");
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  // 🔹 Loading state
  if (loading || movieLoading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">
            Loading seats and movie details...
          </p>
        </div>
      </PageLayout>
    );
  }

  // 🔹 Error state
  if (movieError || !movieData) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Event not found or removed.
          </h2>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      className="max-w-5xl flex flex-col gap-6 md:gap-10"
      imageURL={movieData.imageUrl}
      title={movieData.name}
    >
      {/* Event Info */}
      <div className="bg-base-100 border border-primary/20 rounded-md shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-full md:w-1/3 h-56 rounded-md overflow-hidden shadow-md">
          <Image
            src={movieData.imageUrl}
            alt={movieData.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 text-gray-700 dark:text-gray-200">
          <p className="flex items-center gap-2">
            <MapPin className="size-4" />{" "}
            {movieData.location || "Unknown Location"}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="size-4" />{" "}
            {movieData.date || "Unknown Date"}
            {movieData.time && `, ${movieData.time}`}
          </p>
          <p className="flex items-center gap-2 text-lg font-semibold mt-2">
            <CircleDollarSign className="size-5" /> {movieData.ticketPrice} BDT / seat
          </p>
          {movieData.discount > 0 && (
                <p>
                  Discount:{" "}
                  <span className="font-semibold">{movieData.discount}%</span>
                </p>
              )}
          <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <FaInfoCircle className="size-3" /> You can change currency during
            payment.
          </p>

          <Button
            label="View Details"
            onClick={() => router.push(`/movies/${id}`)}
            className="mt-3 w-fit"
          />
        </div>
      </div>

      {/* Seat Selection */}
      <div className="bg-base-100 border border-primary/20 rounded-md shadow-lg p-6 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Select Your Seats</h2>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 text-sm bg-primary/10 rounded-md px-6 py-3">
          <Legend
            color="bg-primary"
            label={`Total (${movieData.totalSeats || 0})`}
          />
          <Legend
            color="bg-black"
            label={`Available (${movieData.availableSeats || 0})`}
          />
          <Legend
            color="bg-yellow-400"
            label={`Selected (${selected.length})`}
          />
          <Legend color="bg-red-500" label={`Booked (${booked.length})`} />
        </div>

        {/* Seat Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 gap-3 justify-center w-full mt-4">
          {seats.map((seat) => {
            const isBooked = booked.includes(seat);
            const isSelected = selected.includes(seat);
            const seatColor = isBooked
              ? "bg-red-500 text-white cursor-not-allowed"
              : isSelected
              ? "bg-yellow-400 text-black"
              : "bg-black text-white hover:bg-gray-900 cursor-pointer";

            return (
              <motion.button
                key={seat}
                onClick={() => toggleSeat(seat)}
                disabled={isBooked}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className={`py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${seatColor}`}
              >
                {seat}
              </motion.button>
            );
          })}
        </div>

        <MovieSeatProceed
          movieId={id}
          seatLength={selected.length}
          seats={selected}
        />
      </div>
    </PageLayout>
  );
}

// 🔹 Legend Component
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-4 rounded-sm ${color}`}></span>
      <span>{label}</span>
    </div>
  );
}
