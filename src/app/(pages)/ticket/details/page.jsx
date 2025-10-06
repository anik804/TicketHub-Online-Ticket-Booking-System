"use client";

import PageLayout from "@/ui/PageLayout";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { QrCode, MapPinned, CalendarDays, Ticket } from "lucide-react";
import CheckoutButton from "@/components/ticket/CheckoutButton";
import { useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/ticket/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";

export default function TicketDetails() {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const seat = searchParams.get("seat");
  const eventId = searchParams.get("eventId");

  const [transactions, setTransactions] = useState(null);
  const [event, setEvent] = useState(null);

  // Load dummy event (replace later with API)
  useEffect(() => {
    if (!seat || !eventId) return;

    setEvent({
      _id: eventId,
      title: "Cricket Match",
      date: "2025-09-26T16:08:41.672Z",
      location: "Andorkilla, Chittagong",
      price: 120,
    });
  }, [seat, eventId]);

  // Fetch transaction for this seat/event
  useEffect(() => {
    if (!seat || !eventId) return;

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

  // Loading or invalid check
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

  if (loading || status === "loading" || !event) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
        </div>
      </PageLayout>
    );
  }

  // Unauthorized transaction
  if (
    transactions &&
    transactions.status === "PAID" &&
    transactions.email !== session?.user?.email
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

  // Prepare ticket object
  const ticket = {
    id: `TICKETHUB_${eventId.toUpperCase()}_${seat}`,
    eventId: eventId,
    tranId: transactions?.tranId,
    title: event?.title || "Unknown Event",
    date: event ? format(new Date(event.date), "PPPPp") : "N/A",
    location: event?.location || "N/A",
    seat: seat,
    price: event?.price || 0,
    status: transactions?.status || "PANDING",
    name: session?.user?.name || "N/A",
    email: session?.user?.email || "N/A",
    phone: session?.user?.phone || "N/A",
    purchaseDate:
      transactions?.status === "PAID"
        ? "Purchased on " + format(new Date(transactions.paidAt), "PPPp")
        : "Not Purchased Yet!",
  };

  return (
    <PageLayout title="Ticket Details">
      {/* Header */}
      <div className="border border-base-300 p-4 text-center rounded-2xl mb-2">
        <h1 className="text-2xl font-bold">{ticket.title}</h1>
        <p className="text-sm opacity-80">{ticket.id}</p>
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-3">
        <h2 className="text-lg font-semibold">Event Details</h2>
        <p className="flex items-center gap-2">
          <MapPinned className="size-5 text-primary" />{" "}
          <span className="font-medium">{ticket.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays className="size-5 text-primary" /> {ticket.date}
        </p>
        <p className="flex items-center gap-2">
          <Ticket className="size-5 text-primary" />
          <span className="font-medium">{ticket.seat}</span>
        </p>
      </div>

      {/* Ticket Holder */}
      <div className="px-6 py-4 border-t border-base-300">
        <h2 className="text-lg font-semibold mb-2">Ticket Holder</h2>
        <p>{ticket.name}</p>
        <p className="text-sm opacity-80">{ticket.email}</p>
        <p className="text-sm opacity-80">{ticket.phone}</p>
      </div>

      {/* Payment + Status */}
      <div className="px-6 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between">
        <div>
          <p className="font-medium text-2xl mb-1">
            PRICE : {ticket.price} BDT
          </p>
          <p className="text-sm opacity-80 mb-3">{ticket.purchaseDate}</p>
          {ticket.status === "PAID" ? (
            <span className="badge badge-success">Paid</span>
          ) : (
            <span className="badge badge-warning">Pending</span>
          )}
        </div>

        {/* QR and Button */}
        <div className="flex flex-col items-center gap-4">
          {ticket.status === "PAID" ? (
            <>
              <QRCodeCanvas
                value={JSON.stringify(ticket)}
                className="size-20 md:size-26 lg:size-32"
              />
              <DownloadTicket ticket={ticket} />
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
