"use client";

import PageLayout from "@/ui/PageLayout";
import { format } from "date-fns";
import React from "react";
import { QrCode, MapPinned, CalendarDays, Ticket, Check } from "lucide-react";
import Button from "@/ui/Button";
import CheckoutButton from "@/components/CheckoutButton";

// Fake ticket data (used when no `ticket` prop is provided)
const singleTicket = {
  id: "TCKT-20250923-0001",
  event: {
    title: "Sunset Jazz Night",
    eventAt: "2025-09-02T18:30:00.000Z",
    venue: "Glasshouse Hall, Dhaka",
  },
  holder: {
    name: "Ayesha Rahman",
    email: "ayesha@example.com",
    phone: "+8801712345678",
  },
  seat: {
    section: "A",
    row: "5",
    number: "12",
    type: "VIP",
  },
  price: 1500.0,
  currency: "BDT",
  qrPayload: "TCKT-20250923-0001|Sunset Jazz Night|AYESHA",
  paymentStatus: "Panding",
  purchaseDate: "",
};

export default function TicketDetails({ ticket = null }) {
  const t = ticket || singleTicket;

  const eventDate = format(new Date(t.event.eventAt), "PPPP");
  const eventTime = format(new Date(t.event.eventAt), "p");
  const purchaseDate = t.purchaseDate ? "Purchased on "+ format(new Date(t.purchaseDate), "PPPp") : "Not Purchased Yet!";

  return (
    <PageLayout title="Ticket Details">
      {/* Header */}
      <div className="border border-base-300 p-4 text-center rounded-2xl mb-2">
        <h1 className="text-2xl font-bold">{t.event.title}</h1>
        <p className="text-sm opacity-80">{t.id}</p>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">Event Details</h2>
        <p className="flex items-center gap-2">
          <MapPinned className="size-5 text-primary" />{" "}
          <span className="font-medium">{t.event.venue}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" /> {eventDate} at{" "}
          {eventTime}
        </p>
        <p className="flex items-center gap-2">
          <Ticket className="size-5 text-primary" />{" "}
          <span className="badge badge-outline">{t.seat.type}</span> — Section{" "}
          {t.seat.section}, Row {t.seat.row}, Seat {t.seat.number}
        </p>
      </div>

      {/* Ticket Holder */}
      <div className="px-6 py-4 border-t border-base-300">
        <h2 className="text-lg font-semibold mb-2">Ticket Holder</h2>
        <p>{t.holder.name}</p>
        <p className="text-sm opacity-80">{t.holder.email}</p>
        <p className="text-sm opacity-80">{t.holder.phone}</p>
      </div>

      {/* Payment + Status */}
      <div className="px-6 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between">
        <div>
          <p className="font-medium text-2xl mb-1">
            PRICE : {t.price} {t.currency}
          </p>
          <p className="text-sm opacity-80 mb-3">{purchaseDate}</p>
          {t.paymentStatus === "Panding" ? (
            <span className="badge badge-warning">Panding</span>
          ) : (
            <span className="badge badge-success">Paid</span>
          )}
        </div>
        {/* QR and Button */}
        <div className="flex flex-col items-center gap-4">
          {t.paymentStatus === "Panding" ? (
            <>
              <QrCode className="size-20 md:size-26 lg:size-32 opacity-80 border border-base-300 rounded-lg" />
              <CheckoutButton />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
