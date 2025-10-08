"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Image from "next/image";
import { parseISO, format } from "date-fns";
import { Ticket, XCircle, MapPin, CalendarDays, DollarSign } from "lucide-react";

export default function SeatPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [seats, setSeats] = useState([]);
  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch event info
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

  // 🔹 Fetch transactions for this event
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
        const paidSeats = data
          .filter((tran) => tran.status === "PAID")
          .map((tran) => tran.seat);

        setTransactions(data);
        setBooked(paidSeats);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, [eventId]);

  // 🔹 Generate seat layout (A1–Z10)
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

  // 🔹 Handle seat click
  const handleSelect = (seat) => {
    if (booked.includes(seat)) {
      alert("❌ This seat is already booked!");
      return;
    }
    router.push(`/ticket/details?seat=${seat}&eventId=${eventId}`);
  };

  const formatDate = (isoDate) => format(parseISO(isoDate), "PPPPp");

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
      {/* 🔹 Event Info Header */}
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
            <MapPin className="w-5 h-5" /> {event.location}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2 mb-1">
            <CalendarDays className="w-5 h-5" /> {formatDate(event.date)}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-800 dark:text-gray-200 gap-2 mt-2 text-lg font-semibold">
            <DollarSign className="w-5 h-5" /> {event.price} BDT{" "}
            {event.discount ? `(Discount ${event.discount}%)` : ""}
          </p>
        </div>
      </div>

      {/* 🔹 Seat Selection */}
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Select Your Seat ({event.availableSeats} Available)
        </h2>

        <div className="grid grid-cols-10 gap-3 justify-center max-w-5xl mx-auto">
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => handleSelect(seat)}
              disabled={booked.includes(seat)}
              className={`p-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2
                ${
                  booked.includes(seat)
                    ? "bg-red-500 text-white cursor-not-allowed shadow-inner"
                    : "bg-green-500 hover:bg-green-600 text-white cursor-pointer hover:scale-105 shadow-md active:scale-95"
                }`}
            >
              {booked.includes(seat) ? (
                <XCircle className="w-4 h-4" />
              ) : (
                <Ticket className="w-4 h-4" />
              )}
              {seat}
            </button>
          ))}
        </div>

        {/* 🔹 Legend */}
        <div className="mt-10 flex items-center justify-center gap-8 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-green-500 rounded-sm"></span>
            <span className="flex items-center gap-1">
              <Ticket className="w-4 h-4" /> Available
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-red-500 rounded-sm"></span>
            <span className="flex items-center gap-1">
              <XCircle className="w-4 h-4" /> Booked
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
