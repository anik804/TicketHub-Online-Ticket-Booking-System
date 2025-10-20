"use client";

import EventTicketDownload from "@/components/ticket/EventTicketDownload";
import MovieTicketDownload from "@/components/ticket/MovieTicketDownload";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useEventTicket } from "@/hooks/useEventTicket";
import PageLayout from "@/ui/PageLayout";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Button from "@/ui/Button";


export default function EventSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");

  const router = useRouter();

  const { paymentHistory, paymentLoading } = useEventPayment({ tranId });

  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: paymentHistory[0]?.eventId,
    seatQuantity: paymentHistory[0]?.seatQuantity,
    currency: paymentHistory[0]?.currency,
    totalPrice: paymentHistory[0]?.amount,
  });

  // 🔹 Loading State
  if (paymentLoading) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Loading your ticket...
      </PageLayout>
    );
  }

  // 🔹 No Payment Found
  if (!paymentHistory) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        No payment record found for this transaction ID.
      </PageLayout>
    );
  }

  // 🔹 Movie still loading
  if (ticketLoading || ticketError) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Loading ticket details...
      </PageLayout>
    );
  }

  if (!eventTicket) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Ticket not found.
      </PageLayout>
    );
  }

  // 🔹 Final Render
  return (
    <PageLayout
      className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
      title="Ticket Status"
      imageURL={eventTicket?.imageUrl}
    >
      <h2 className="text-xl font-semibold mb-3">{eventTicket?.title}</h2>
      <p>
        <strong>Transaction ID:</strong> {paymentHistory[0].tranId}
      </p>
      <p>
        <strong>Paid By:</strong> {paymentHistory[0].paidBy}
      </p>
      <p>
        <strong>Seat Quantity:</strong> {paymentHistory[0].seatQuantity}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="text-green-600 font-medium">
          {paymentHistory[0].status || "Success"}
        </span>
      </p>

      <QRCodeCanvas
        value={JSON.stringify(paymentHistory[0])}
        className="size-28 md:size-40 border border-primary/30 p-2 rounded-md shadow"
      />

      <div className="mt-5 flex flex-wrap gap-2 items-center">
        <Button
          label={"More Seats"}
          onClick={() => router.push(`/ticket/event?id=${eventTicket.eventId}`)}
        />

        <Button
          label={"View Details"}
          onClick={() => router.push(`/browse-events/${eventTicket.eventId}`)}
        />

        <EventTicketDownload
          eventTicket={eventTicket}
          paymentHistory={paymentHistory[0]}
        />
      </div>
    </PageLayout>
  );
}
