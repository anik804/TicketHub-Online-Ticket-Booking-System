"use client";

import DownloadTicket from "@/components/ticket/DownloadTicket";
import { useMovieData } from "@/hooks/useMovieData";
import { useMovieTicket } from "@/hooks/useMovieTicket";
import PageLayout from "@/ui/PageLayout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function StatusPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");

  const [paymentHistory, setPaymentHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 🔹 Fetch Payment History
  useEffect(() => {
    if (!tranId) return;

    const fetchTransHistory = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const res = await fetch(`/api/payment/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tranId }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch payment history");
        }

        const data = await res.json();

        // handle both array/object responses safely
        const result = Array.isArray(data)
          ? data[0]
          : Array.isArray(data.transactions)
          ? data.transactions[0]
          : data;

        setPaymentHistory(result || null);
      } catch (err) {
        console.error("Transaction fetch error:", err);
        setFetchError(err.message);
        setPaymentHistory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransHistory();
  }, [tranId]);

  // 🔹 Load movie ticket data


  const { movieTicket, ticketLoading, ticketError, movieError } = useMovieTicket({
    eventId: paymentHistory?.eventId,
    seats: paymentHistory?.seats,
    currency: paymentHistory?.currency,
    totalPrice: paymentHistory?.amount,
  });

  console.log(movieTicket);

  // 🔹 Loading State
  if (loading) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Loading your ticket...
      </PageLayout>
    );
  }

  // 🔹 Error State
  if (fetchError) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        <p className="text-red-500 font-medium">
          ⚠️ Error: {fetchError || "Unable to load payment history."}
        </p>
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
  if (ticketLoading) {
    return (
      <PageLayout
        className="max-w-4xl mx-auto p-5 border border-primary/20 shadow rounded-md"
        title="Ticket Status"
      >
        Loading ticket details...
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
        <strong>Transaction ID:</strong> {paymentHistory.tranId}
      </p>
      <p>
        <strong>Paid By:</strong> {paymentHistory.paidBy}
      </p>
      <p>
        <strong>Seats:</strong>{" "}
        {Array.isArray(paymentHistory.seats)
          ? paymentHistory.seats.join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="text-green-600 font-medium">
          {paymentHistory.status || "Success"}
        </span>
      </p>
      <DownloadTicket tranId={paymentHistory.tranId} />
    </PageLayout>
  );
}
