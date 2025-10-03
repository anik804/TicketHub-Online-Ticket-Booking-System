"use client";

import PageLayout from "@/ui/PageLayout";
import { format, set } from "date-fns";
import React, { useEffect, useState } from "react";
import { QrCode, MapPinned, CalendarDays, Ticket } from "lucide-react";
import CheckoutButton, { event } from "@/components/event/CheckoutButton";
import { useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/event/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";

export default function TicketDetails() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const seat = searchParams.get("seat");
  const eventId = searchParams.get("eventId");

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if (!seat || !eventId) {
      return;
    }

    setLoading(true);

    const fetchTransaction = async () => {
      try {
        const res = await fetch(
          `/api/payment/transactions?seat=${seat}&eventId=${eventId}`
        );
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.log("Failed to load transaction:", err);
        setTransactions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [seat, eventId]);

  if (!seat || !eventId) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            Invalid ticket details!
          </h1>
          <p className="text-sm opacity-80">
            Please check your ticket details and try again.
          </p>
        </div>
      </PageLayout>
    );
  }

  if (loading || status === "loading") {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
        </div>
      </PageLayout>
    );
  }

  if (
    transactions &&
    transactions.status === "PAID" &&
    transactions.email !== session.user.email
  ) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            The ticket is not Available!
          </h1>
          <p className="text-sm opacity-80">
            Please go back and try other tickets.
          </p>
        </div>
      </PageLayout>
    );
  }

  // Date formatting
  const eventDate = format(new Date(event.date), "PPPPp");
  const purchaseDate =
    transactions.status === "PAID"
      ? "Purchased on " + format(new Date(transactions.paidAt), "PPPp")
      : "Not Purchased Yet!";

  return (
    <PageLayout title="Ticket Details">
      {/* Header */}
      <div className="border border-base-300 p-4 text-center rounded-2xl mb-2">
        <h1 className="text-2xl font-bold">{event.title}</h1>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">Event Details</h2>
        <p className="flex items-center gap-2">
          <MapPinned className="size-5 text-primary" />{" "}
          <span className="font-medium">{event.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" /> {eventDate}
        </p>
        <p className="flex items-center gap-2">
          <Ticket className="size-5 text-primary" />
          <span className="font-medium">{seat}</span>
        </p>
      </div>

      {/* Ticket Holder */}
      <div className="px-6 py-4 border-t border-base-300">
        <h2 className="text-lg font-semibold mb-2">Ticket Holder</h2>
        <p>{session.user.name}</p>
        <p className="text-sm opacity-80">{session.user.email}</p>
        <p className="text-sm opacity-80">{session.user.phone || "N/A"}</p>
      </div>

      {/* Payment + Status */}
      <div className="px-6 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between">
        <div>
          <p className="font-medium text-2xl mb-1">PRICE : {event.price} BDT</p>
          <p className="text-sm opacity-80 mb-3">{purchaseDate}</p>
          {!loading && transactions.status === "PAID" ? (
            <span className="badge badge-success">Paid</span>
          ) : (
            <span className="badge badge-warning">Pending</span>
          )}
        </div>

        {/* QR and Button */}
        <div className="flex flex-col items-center gap-4">
          {!loading && transactions.status === "PAID" ? (
            <>
              <QRCodeCanvas
                value={`${process.env.NEXT_PUBLIC_BASE_URL}/ticket-verify?tranId=${transactions?.tranId}`}
                className="size-20 md:size-26 lg:size-32"
              />
              <DownloadTicket />
            </>
          ) : (
            <>
              <QrCode className="size-20 md:size-26 lg:size-32 opacity-80 border border-base-300 rounded-lg" />
              <CheckoutButton seat={seat} eventId={eventId} />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
