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

// -------------------------------
// 🔹 Dummy Event Data
// -------------------------------
const dummyEvent = {
  _id: "68df6fbcc712eb0ef7a6a98e",
  title: "Cricket Match",
  date: "2025-09-26T16:08:41.672Z",
  location: "Andorkilla, Chittagong",
  price: 120,
  desc: "Pakistan vs Bangladesh T20I Final Match",
  category: "sports",
  imageUrl: "https://i.ibb.co.com/5hzLny6Y/ai-rising.webp",
  totalSeats: 200,
  availableSeats: 200,
  discount: 0,
  organizerEmail: "pranoy@gmail.com",
  lat: 22.3554568,
  lng: 91.8397677,
  createdAt: "2025-09-24T16:08:41.672Z",
};

export default function TicketDetails() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const seat = searchParams.get("seat");
  const eventId = searchParams.get("eventId");

  const [transactions, setTransactions] = useState(null);
  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // 💱 Currency Converter
  // -------------------------------
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [currency, setCurrency] = useState("BDT");
  const [converting, setConverting] = useState(false);
  const currencies = ["BDT", "USD", "EUR", "GBP", "INR", "AUD", "CAD"];

  // -------------------------------
  // 🧩 Initialize Event
  // -------------------------------
  useEffect(() => {
    if (!seat || !eventId) return;
    setEvent(dummyEvent);
  }, [seat, eventId]);

  // -------------------------------
  // 🧩 Initialize Ticket
  // -------------------------------
  useEffect(() => {
    if (!event) return;
    setTicket({
      id: `TICKETHUB_${eventId.toUpperCase()}_${seat}`,
      eventId,
      tranId : transactions?.tranId,
      title: event?.title,
      date: format(new Date(event?.date), "PPPPp"),
      location: event?.location,
      seat,
      price: Number(convertedPrice),
      currency,
      status: transactions?.status || "PENDING",
      customerName: session?.user?.name || "N/A",
      customerEmail: session?.user?.email || "N/A",
      purchaseDate:
        transactions?.status === "PAID"
          ? "Purchased on " + format(new Date(transactions.paidAt), "PPPp")
          : "Not Purchased Yet",
    });
  }, [event, seat, transactions, convertedPrice, currency]);

  // -------------------------------
  // 💸 Fetch Existing Transaction
  // -------------------------------
  useEffect(() => {
    if (!seat || !eventId) return;

    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/payment/transactions?seat=${seat}&eventId=${eventId}`
        );
        if (!res.ok) throw new Error("Failed to fetch transaction");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Transaction load failed:", err);
        setTransactions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [seat, eventId]);

  // -------------------------------
  // 💱 Currency Conversion Logic
  // -------------------------------
  useEffect(() => {
    if (!event?.price || !currency) return;

    const convertCurrency = async () => {
      setConverting(true);
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/5d75648c6024f50ca5e6c413/pair/BDT/${currency}/${event.price}`
        );
        const data = await res.json();

        if (data.result === "success") {
          setConvertedPrice(parseFloat(data.conversion_result).toFixed(2));
        } else {
          console.error("Conversion failed", data);
          setConvertedPrice(event.price);
        }
      } catch (error) {
        console.error("Error fetching rate:", error);
        setConvertedPrice(event.price);
      } finally {
        setConverting(false);
      }
    };

    convertCurrency();
  }, [currency, event?.price]);

  // -------------------------------
  // ❌ Invalid Ticket Case
  // -------------------------------
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

  // -------------------------------
  // ⏳ Loading States
  // -------------------------------
  if (loading || status === "loading" || !event) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading ticket details...</p>
        </div>
      </PageLayout>
    );
  }

  // -------------------------------
  // 🚫 Unauthorized Transaction
  // -------------------------------
  if (
    transactions &&
    transactions.status === "PAID" &&
    transactions.email !== session?.user?.email
  ) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            The ticket is not available!
          </h1>
          <p className="text-sm opacity-80">
            Please go back and try another ticket.
          </p>
        </div>
      </PageLayout>
    );
  }

  // -------------------------------
  // 🧾 Render Page
  // -------------------------------
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
          <MapPinned className="size-5 text-primary" />
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

      {/* Payment + Status */}
      <div className="px-6 py-4 border-t border-base-300 flex flex-col md:flex-row justify-between">
        <div>
          <div className="font-medium text-2xl mb-1 flex items-center gap-3">
            PRICE :
            {ticket.status === "PAID" ? (
              " " + transactions.amount + " " + transactions.currency
            ) : (
              <>
                {converting ? (
                  <span className="loading loading-bars loading-sm" />
                ) : (
                  <span>{convertedPrice}</span>
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <p className="text-sm opacity-80 mb-3">{ticket.purchaseDate}</p>
          {ticket.status === "PAID" ? (
            <span className="badge badge-success">Paid</span>
          ) : (
            <span className="badge badge-warning">Pending</span>
          )}
        </div>

        {/* QR + Payment */}
        <div className="flex flex-col items-center gap-4">
          {ticket.status === "PAID" ? (
            <>
              <QRCodeCanvas
                value={JSON.stringify(ticket)}
                className="size-24 border rounded-xl p-2"
              />
              <DownloadTicket ticket={ticket} />
            </>
          ) : (
            <>
              <QrCode className="size-24 opacity-80 border border-base-300 rounded-lg" />
              <CheckoutButton ticket={ticket} />
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
