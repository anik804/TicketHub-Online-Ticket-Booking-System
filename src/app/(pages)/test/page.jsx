"use client";
import { useMovieTicket } from "@/hooks/useMovieTicket";
import Image from "next/image";

export default function TicketPage() {
  const eventId = "68e00fda1a9bc1173ec873fb";
  const seats = ["A1", "A2"];
  const currency = "USD";
  const convertedPrice = 10;

  const { movieTicket, ticketLoading, ticketError, movieError } = useMovieTicket({
    eventId,
    seats,
    currency,
    convertedPrice,
  });

  if (ticketLoading) return <p className="p-6 text-gray-500">Loading your ticket...</p>;
  if (ticketError) return <p className="p-6 text-red-500">❌ {ticketError}</p>;
  if (movieError) return <p className="p-6 text-red-500">🎬 {movieError}</p>;
  if (!movieTicket) return <p className="p-6">No ticket data found.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden border mt-10">
      {movieTicket.imageUrl && (
        <Image
          src={movieTicket.imageUrl}
          alt={movieTicket.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{movieTicket.title}</h2>
        <p className="text-gray-600">{movieTicket.date}</p>
        <p className="text-gray-700 mt-1">📍 {movieTicket.location}</p>
        <div className="mt-3 border-t pt-3 text-sm">
          <p>🎟️ Seats: {movieTicket.seats.join(", ")}</p>
          <p>💰 Total: {movieTicket.price} {movieTicket.currency}</p>
          <p>👤 {movieTicket.customerName}</p>
          <p>📧 {movieTicket.customerEmail}</p>
          <p>🧾 {movieTicket.purchaseDate}</p>
          <p>Status: <span className="font-medium text-blue-600">{movieTicket.status}</span></p>
        </div>
      </div>
    </div>
  );
}
