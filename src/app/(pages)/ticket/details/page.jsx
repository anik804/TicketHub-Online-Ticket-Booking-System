"use client";

import PageLayout from "@/ui/PageLayout";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState, useMemo } from "react";
import { QrCode, Ticket, MapPin, CalendarDays } from "lucide-react";
import CheckoutButton from "@/components/ticket/CheckoutButton";
import { useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/ticket/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function TicketDetails() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const seatParam = searchParams.get("seats");
  const seats = useMemo(() => {
    if (!seatParam) return [];
    return seatParam.startsWith("[")
      ? JSON.parse(decodeURIComponent(seatParam))
      : [seatParam];
  }, [seatParam]);

  const eventId = searchParams.get("eventId");

  const [event, setEvent] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currency, setCurrency] = useState("BDT");
  const [convertedPrice, setConvertedPrice] = useState(0);
  const [converting, setConverting] = useState(false);
  const currencies = ["BDT", "USD", "EUR", "GBP", "INR", "AUD", "CAD"];

  // Fetch Event
  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    fetch(`/api/browse-event/${eventId}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [eventId]);

  // Fetch Transaction
  useEffect(() => {
    if (!seats.length || !eventId) return;

    fetch(
      `/api/payment/transactions?eventId=${eventId}&seats=${encodeURIComponent(
        JSON.stringify(seats)
      )}`
    )
      .then((res) => res.json())
      .then((data) => setTransaction(data || null))
      .catch(() => setTransaction(null));
  }, [seats, eventId]);

  // Currency Conversion
  useEffect(() => {
    if (!event?.price) return;

    setConverting(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/5d75648c6024f50ca5e6c413/pair/BDT/${currency}/${event.price}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") setConvertedPrice(Number(data.conversion_result));
        else setConvertedPrice(event.price);
      })
      .catch(() => setConvertedPrice(event.price))
      .finally(() => setConverting(false));
  }, [currency, event?.price]);

  console.log(convertedPrice);

  // Prepare Ticket Object
  useEffect(() => {
    if (!event || !seats.length) return;

    const eventDate = event?.date
      ? format(parseISO(event.date), "PPPPp")
      : "Date not available";

    // ✅ Calculate total using convertedPrice
    const totalPrice = convertedPrice * seats.length;

    setTicket({
      id: `TICKET_${eventId?.slice(0, 6)?.toUpperCase()}_${seats.join("-")}`,
      eventId,
      tranId: transaction?.tranId || null,
      title: event?.title,
      date: eventDate,
      location: event?.location,
      seats,
      price: totalPrice,
      currency,
      organizerEmail: event?.organizerEmail,
      status: transaction?.status || "PENDING",
      customerName: session?.user?.name || "N/A",
      customerEmail: session?.user?.email || "N/A",
      purchaseDate: transaction?.paidAt
        ? "Purchased on " + format(new Date(transaction.paidAt), "PPPp")
        : "Not Purchased Yet",
    });
  }, [event, transaction, seats, convertedPrice, currency, eventId, session?.user]);

  if (loading || status === "loading" || !ticket) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading ticket details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!seats.length || !eventId || !event) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-2xl font-bold text-red-500">
            Invalid or missing ticket data
          </h1>
          <p className="text-sm text-gray-500">
            Please go back and select a valid seat.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Ticket Details">
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image
          src={event?.imageUrl}
          alt={event?.title}
          fill
          className="object-cover brightness-90"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 flex justify-between items-end text-white">
          <div>
            <h1 className="text-3xl font-bold">{event?.title}</h1>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {event?.location}
            </p>
            <p className="flex items-center gap-2 opacity-90">
              <CalendarDays size={16} /> {ticket.date}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/ticket/seat?eventId=${eventId}`}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm text-white"
            >
              Other Seats
            </Link>
            <Link
              href={`/browse-events/${eventId}`}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md text-sm text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* Ticket Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Ticket className="text-orange-500" /> Ticket Information
        </h2>
        <div className="flex flex-col gap-2 text-sm">
          <p className="space-x-2 mb-2">
            <strong>Seats:</strong> {

ticket.seats.map((seat) => (
  <span
    className="py-1 px-2 rounded-sm border text-green-800 bg-green-300 border-green-800"
    key={seat}
  >
    {seat}
  </span>
))
            }
          </p>
          <p>
            <strong>Date:</strong> {ticket.date}
          </p>
          <p>
            <strong>Customer:</strong> {ticket.customerName}
          </p>
          <p>
            <strong>Email:</strong> {ticket.customerEmail}
          </p>
        </div>
      </div>

      {/* Payment & Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <QrCode className="text-orange-500" /> Payment & Status
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              {ticket.status === "SUCCESS"
                ? `${transaction.amount} ${transaction.currency}`
                : converting
                ? "Converting..."
                : `${ticket.price.toFixed(2)} ${currency}`}
            </p>

            {ticket.status !== "SUCCESS" && (
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm mt-2 focus:ring-2 focus:ring-orange-400"
              >
                {currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>
            )}

            <p className="text-sm text-gray-500 mt-2">{ticket.purchaseDate}</p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-4 md:mt-0">
            {ticket.status === "SUCCESS" ? (
              <>
                <QRCodeCanvas
                  value={JSON.stringify(ticket)}
                  className="size-28 border p-2 rounded-lg"
                />
                <DownloadTicket ticket={ticket} />
              </>
            ) : (
              !converting && <CheckoutButton ticket={ticket} />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
