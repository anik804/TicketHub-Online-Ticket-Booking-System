"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";

export default function TicketPage() {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    // Example API call (replace with your real backend route)
    async function fetchTicket() {
      const res = await fetch(`/api/tickets/${id}`); // ticket ID
      const data = await res.json();
      setTicket(data);
    }
    fetchTicket();
  }, []);

  if (!ticket) return <p className="text-center py-10">Loading ticket...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
        {/* Event Banner */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6">
          <Image
            src={ticket.eventImage}
            alt={ticket.eventName}
            fill
            className="object-cover"
          />
        </div>

        {/* Event Info */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {ticket.eventName}
        </h1>
        <p className="text-gray-600 mb-4">
          {ticket.eventDate} • {ticket.eventTime}
          <br />
          {ticket.venue}
        </p>

        {/* Ticket Info */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <p><span className="font-semibold">Ticket ID:</span> {ticket.id}</p>
          <p><span className="font-semibold">Name:</span> {ticket.userName}</p>
          <p><span className="font-semibold">Email:</span> {ticket.userEmail}</p>
          <p><span className="font-semibold">Seat:</span> {ticket.seat || "General"}</p>
          <p><span className="font-semibold">Price:</span> ${ticket.price}</p>
          <p><span className="font-semibold">Payment:</span> {ticket.paymentStatus}</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center bg-white p-4 rounded-lg shadow">
          <QRCode
            value={ticket.id}
            size={128}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Show this QR code at the event entrance.
        </p>
      </div>
    </div>
  );
}
