"use client";

import DownloadTicket from "@/components/ticket/MovieTicketDownload";
import { useMoviePayment } from "@/hooks/useMoviePayment";
import { useMovieTicket } from "@/hooks/useMovieTicket";
import PageLayout from "@/ui/PageLayout";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect, useState } from "react";

export default function MovieSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");

  const { paymentHistory, paymentLoading } = useMoviePayment({ tranId });

  const { movieTicket, ticketLoading, ticketError, movieError } =
    useMovieTicket({
      movieId: paymentHistory[0]?.movieId,
      seats: paymentHistory[0]?.seats,
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
  if (ticketLoading || movieError || ticketError) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Loading ticket details...
      </PageLayout>
    );
  }

  if (!movieTicket) {
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
      imageURL={movieTicket?.imageUrl}
    >
      <h2 className="text-xl font-semibold mb-3">{movieTicket?.title}</h2>
      <p>
        <strong>Transaction ID:</strong> {paymentHistory[0].tranId}
      </p>
      <p>
        <strong>Paid By:</strong> {paymentHistory[0].paidBy}
      </p>
      <p>
        <strong>Seats:</strong>{" "}
        {Array.isArray(paymentHistory[0].seats)
          ? paymentHistory[0].seats.join(", ")
          : "N/A"}
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

      <div className="mt-5">
        <DownloadTicket
          movieTicket={movieTicket}
          paymentHistory={paymentHistory[0]}
        />
      </div>
    </PageLayout>
  );
}
