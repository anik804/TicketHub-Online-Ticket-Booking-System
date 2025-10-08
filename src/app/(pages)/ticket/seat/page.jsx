"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Image from "next/image";
import { parseISO, format } from "date-fns";
import {
  Ticket,
  XCircle,
  MapPin,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { FaInfo } from "react-icons/fa";

export default function SeatPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [seats, setSeats] = useState([]);
  const [booked, setBooked] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch event details once
  useEffect(() => {
    if (!eventId) return;
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/browse-event/${eventId}`);
        const data = await res.json();
        setEvent(data);
        setSeats(generateSeatLayout(data.totalSeats || 100));
      } catch (err) {
        console.error("Failed to load event:", err);
      }
    }
    fetchEvent();
  }, [eventId]);

  // 🔹 Fetch paid transactions & refresh every 10s
  useEffect(() => {
    if (!eventId) return;

    async function fetchTransactions() {
      try {
        const res = await fetch("/api/payment/history/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        });

        const data = await res.json();

        const transactionsArray = Array.isArray(data) ? data : [];

        const paidSeats = transactionsArray
          .filter((tran) => tran?.status === "PAID")
          .map((tran) => tran.seats)
          .flat();

        setTransactions(transactionsArray);
        setBooked(paidSeats);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    // 🔁 Initial fetch + auto refresh every 10s
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 5000);

    return () => clearInterval(interval);
  }, [eventId]);

  // 🔹 Generate seat layout (A1–Z20)
  const generateSeatLayout = (total) => {
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

  // 🔹 Handle seat selection
  const handleSelect = (seat) => {
    if (booked.includes(seat)) {
      alert("❌ This seat is already booked!");
      return;
    }
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  // 🔹 Proceed to ticket details
  const handleProceed = () => {
    if (selected.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    router.push(
      `/ticket/details?eventId=${eventId}&seats=${encodeURIComponent(
        JSON.stringify(selected)
      )}`
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-600">Loading seat map...</p>
        </div>
      </PageLayout>
    );
  }

  if (!event) {
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
    <PageLayout>
      {/* Event Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-6 border border-gray-200 dark:border-gray-700">
        <div className="relative w-full md:w-1/3 h-52 rounded-xl overflow-hidden shadow-md">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {event.title}
          </h1>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2 mb-1">
            <MapPin className="size-4" /> {event.location}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2 mb-1">
            <CalendarDays className="size-4" />{" "}
            {format(parseISO(event?.date), "PPPPp")}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-800 dark:text-gray-200 gap-2 mt-2 text-lg font-semibold">
            <CircleDollarSign className="size-5" /> {event.price} BDT Per Ticket
          </p>
          <p className="flex items-center text-xs text-gray-400 gap-2 mt-2 mb-4">
            <FaInfo className="size-[14px] p-[3px] border border-gray-200 rounded-full" />{" "}
            You can change currency in ticket details page.
          </p>
          <Link
            href={`/browse-events/${eventId}`}
            className="rounded-md shadow-sm bg-orange-400 hover:bg-orange-500 px-4 py-2 text-semibold text-sm text-white"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="p-2 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Select Your Seats ({event.availableSeats} Available)
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3 justify-center w-full">
          {seats.map((seat) => {
            const isBooked = booked.includes(seat);
            const isSelected = selected.includes(seat);
            return (
              <button
                key={seat}
                onClick={() => handleSelect(seat)}
                disabled={isBooked}
                className={`py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer
                  ${
                    isBooked
                      ? "bg-red-500 text-white cursor-not-allowed shadow-inner"
                      : isSelected
                      ? "bg-yellow-400 text-black hover:bg-yellow-500"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                {isBooked ? (
                  <XCircle className="w-4 h-4" />
                ) : (
                  <Ticket className="w-4 h-4" />
                )}
                {seat}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="size-4 bg-green-500 rounded-sm"></span>
            <span className="flex items-center gap-1">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-4 bg-yellow-400 rounded-sm"></span>
            <span className="flex items-center gap-1">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-4 bg-red-500 rounded-sm"></span>
            <span className="flex items-center gap-1">Booked</span>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-10">
          <button
            onClick={handleProceed}
            disabled={selected.length === 0}
            className={`px-6 py-3 rounded-lg text-white font-semibold transition-all cursor-pointer ${
              selected.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Proceed to Ticket ({selected.length})
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
