"use client";

import PageLayout from "@/ui/PageLayout";
import { format } from "date-fns";
import React from "react";
import { QrCode, MapPinned, CalendarDays, Ticket } from "lucide-react";
import CheckoutButton from "@/components/event/CheckoutButton";
import { useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/event/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketDetails() {
  const searchParams = useSearchParams();
  const seat = searchParams.get("seat");

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
    seat: seat,
    payment: {
      price: 1500.0,
      currency: "BDT",
      status: "Panding",
      purchaseDate: "2025-09-01T10:00:00.000Z",
      transactionId: "TXN123456",
    },
  };

  // Date formatting
  const eventDate = format(new Date(singleTicket.event.eventAt), "PPPP");
  const eventTime = format(new Date(singleTicket.event.eventAt), "p");
  const purchaseDate = singleTicket.payment.purchaseDate
    ? "Purchased on " +
      format(new Date(singleTicket.payment.purchaseDate), "PPPp")
    : "Not Purchased Yet!";

  // 👉 QR value = full ticket data as JSON
  const qrValue = JSON.stringify({
    id: singleTicket.id,
    seat: singleTicket.seat,
    holder: singleTicket.holder,
    event: singleTicket.event,
    payment: singleTicket.payment,
  });

  return (
    <PageLayout title="Ticket Details">
      {/* Header */}
      <div className="border border-base-300 p-4 text-center rounded-2xl mb-2">
        <h1 className="text-2xl font-bold">{singleTicket.event.title}</h1>
        <p className="text-sm opacity-80">{singleTicket.id}</p>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">Event Details</h2>
        <p className="flex items-center gap-2">
          <MapPinned className="size-5 text-primary" />{" "}
          <span className="font-medium">{singleTicket.event.venue}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" /> {eventDate} at{" "}
          {eventTime}
        </p>
        <p className="flex items-center gap-2">
          <Ticket className="size-5 text-primary" />
          <span className="font-medium">{singleTicket.seat}</span>
        </p>
      </div>

      {/* Ticket Holder */}
      <div className="px-6 py-4 border-t border-base-300">
        <h2 className="text-lg font-semibold mb-2">Ticket Holder</h2>
        <p>{singleTicket.holder.name}</p>
        <p className="text-sm opacity-80">{singleTicket.holder.email}</p>
        <p className="text-sm opacity-80">{singleTicket.holder.phone}</p>
      </div>

      {/* Payment + Status */}
      <div className="px-6 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between">
        <div>
          <p className="font-medium text-2xl mb-1">
            PRICE : {singleTicket.payment.price} {singleTicket.payment.currency}
          </p>
          <p className="text-sm opacity-80 mb-3">{purchaseDate}</p>
          {singleTicket.payment.status === "Panding" ? (
            <span className="badge badge-warning">Pending</span>
          ) : (
            <span className="badge badge-success">Paid</span>
          )}
        </div>

        {/* QR and Button */}
        <div className="flex flex-col items-center gap-4">
          {singleTicket.payment.status === "Panding" ? (
            <>
              <QrCode className="size-20 md:size-26 lg:size-32 opacity-80 border border-base-300 rounded-lg" />
              <CheckoutButton seat={seat} />
            </>
          ) : (
            <>
              {/* Auto QR Code for Paid Ticket */}
              <QRCodeCanvas value={qrValue} className="size-20 md:size-26 lg:size-32" />
              <DownloadTicket ticket={singleTicket} />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
