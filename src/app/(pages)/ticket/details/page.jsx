"use client";

import PageLayout from "@/ui/PageLayout";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { QrCode, MapPinned, CalendarDays, Ticket, CheckCircle, Clock } from "lucide-react";
import CheckoutButton from "@/components/ticket/CheckoutButton";
import { useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/ticket/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

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

  const [convertedPrice, setConvertedPrice] = useState(0);
  const [currency, setCurrency] = useState("BDT");
  const [converting, setConverting] = useState(false);
  const currencies = ["BDT", "USD", "EUR", "GBP", "INR", "AUD", "CAD"];

  // Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      if (!seat || !eventId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/browse-event/${eventId}`);
        const data = await res.json();
        setEvent(data || dummyEvent);
      } catch {
        setEvent(dummyEvent);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [seat, eventId]);

  // Fetch Transaction
  useEffect(() => {
    if (!seat || !eventId) return;
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/payment/transactions?seat=${seat}&eventId=${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch transaction");
        const data = await res.json();
        setTransactions(data);
      } catch {
        setTransactions(null);
      }
    };
    fetchTransaction();
  }, [seat, eventId]);

  // Currency Conversion
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
          setConvertedPrice(event.price);
        }
      } catch {
        setConvertedPrice(event.price);
      } finally {
        setConverting(false);
      }
    };
    convertCurrency();
  }, [currency, event?.price]);

  const formattedEventDate = event?.date
  ? format(parseISO(event?.date), "PPPPp")
  : "Date unavailable";

  // Setup Ticket Data
  useEffect(() => {
    if (!event) return;
    setTicket({
      id: `TICKETHUB_${eventId?.toUpperCase()}_${seat}`,
      eventId,
      tranId: transactions?.tranId,
      title: event?.title,
      date: formattedEventDate,
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

  if (!seat || !eventId) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold text-red-500">Invalid ticket details!</h1>
          <p className="text-sm opacity-70">Please check your ticket info and try again.</p>
        </div>
      </PageLayout>
    );
  }

  if (loading || status === "loading" || !event) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen text-lg">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          Loading ticket details...
        </div>
      </PageLayout>
    );
  }

  if (transactions?.status === "PAID" && transactions.email !== session?.user?.email) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold text-red-500">The ticket is not available!</h1>
          <p className="text-sm opacity-70">Please try another one.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Ticket Details">
      {/* Banner */}
      <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-md mb-5">
        <img
          src={event?.imageUrl}
          alt={event?.title}
          className="object-cover w-full h-full brightness-90"
        />
        <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
          <h1 className="text-3xl font-bold">{event?.title}</h1>
          <p className="opacity-90">{event?.location}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-primary" /> Ticket Information
        </h2>
        <p className="text-sm mb-1">Seat: <strong>{ticket.seat}</strong></p>
        <p className="text-sm mb-1">Date: <strong>{ticket.date}</strong></p>
        <p className="text-sm mb-1">Customer: <strong>{ticket.customerName}</strong></p>
        <p className="text-sm">Email: <strong>{ticket.customerEmail}</strong></p>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-primary" /> Payment & Status
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-2xl font-bold mb-2">
              {ticket.status === "PAID"
                ? `${transactions.amount} ${transactions.currency}`
                : converting
                ? "Converting..."
                : `${convertedPrice} ${currency}`}
            </p>
            {ticket.status !== "PAID" && (
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="select border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-primary"
              >
                {currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            )}
            <p className="text-sm text-gray-500 mt-1">{ticket.purchaseDate}</p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-4 md:mt-0">
            {ticket.status === "PAID" ? (
              <>
                <QRCodeCanvas value={JSON.stringify(ticket)} className="size-28 border p-2 rounded-lg" />
                <DownloadTicket ticket={ticket} />
              </>
            ) : (
              <CheckoutButton converting={converting} ticket={ticket} />
            )}
          </div>
        </div>
      </div>

      
    </PageLayout>
  );
}
