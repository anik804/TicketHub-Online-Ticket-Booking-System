"use client";

import PageLayout from "@/ui/PageLayout";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState, useMemo } from "react";
import {
  QrCode,
  Ticket,
  MapPin,
  CalendarDays,
  CircleDollarSign,
} from "lucide-react";
import CheckoutButton from "@/components/ticket/CheckoutButton";
import { useRouter, useSearchParams } from "next/navigation";
import DownloadTicket from "@/components/ticket/DownloadTicket";
import { QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaInfo, FaRegUserCircle } from "react-icons/fa";
import { MdEmail, MdEventSeat } from "react-icons/md";
import Button from "@/ui/Button";

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

  const router = useRouter();

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
        if (data.result === "success")
          setConvertedPrice(Number(data.conversion_result));
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
      imageUrl: event?.imageUrl,
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
  }, [
    event,
    transaction,
    seats,
    convertedPrice,
    currency,
    eventId,
    session?.user,
  ]);

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
    <PageLayout
      className={"grid grid-cols-1 md:grid-cols-2 gap-6"}
      title="Ticket Details"
      imageURL={event?.imageUrl}
    >
      {/* Event Info */}
      <div className="bg-base-100 rounded-md shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-primary/20">
        <div className="relative w-full md:w-1/3 h-52 rounded-md overflow-hidden shadow-md">
          <Image
            src={ticket.imageUrl}
            alt={ticket.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Ticket className="text-primary" /> Ticket Information
          </h2>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {ticket.title}
          </h1>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2">
            <MapPin className="size-4" /> {ticket.location}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2">
            <CalendarDays className="size-4" />{" "}
            {ticket.date || "Date not available"}
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2">
            <FaRegUserCircle className="size-4" />{" "}
            {ticket.customerName || "N/A"}
          </p>

          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2">
            <MdEmail className="size-4" /> {ticket.customerEmail || "N/A"}
          </p>

          <p className="flex items-center justify-center md:justify-start text-gray-600 dark:text-gray-300 gap-2 my-3">
            <MdEventSeat className="size-4" />{" "}
            {ticket.seats.map((seat) => (
              <span
                className="py-1 px-2 rounded-sm border text-green-800 bg-green-300 border-green-800"
                key={seat}
              >
                {seat}
              </span>
            ))}
          </p>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              label={"Other Seats"}
              onClick={() => router.push(`/ticket/seat?eventId=${eventId}`)}
            />

            <Button
              label={"View Details"}
              onClick={() => router.push(`/browse-events/${eventId}`)}
            />
          </div>
        </div>
      </div>

      {/* Payment & Status */}
      <div className="bg-base-100 rounded-md shadow-lg p-6 mb-8 flex flex-col items-center md:items-start gap-6 border border-primary/20">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <QrCode className="text-primary" /> Payment & Status
        </h2>

        <div className="w-full h-full flex flex-col md:flex-row justify-between items-center md:items-start ">
          <div className="flex flex-col h-full mb-4">
            <div className="flex-1">
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
                  className="select select-bordered select-primary focus-within:ring-1 mt-2"
                >
                  {currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
              )}

              <p className="text-sm text-gray-500 mt-2">
                {ticket.purchaseDate}
              </p>
            </div>

            <div>
              {ticket.status === "SUCCESS" ? (
                <DownloadTicket ticket={ticket} />
              ) : (
                !converting && <CheckoutButton ticket={ticket} />
              )}
            </div>
          </div>

          {ticket.status === "SUCCESS" && (
            <QRCodeCanvas
              value={JSON.stringify(ticket)}
              className="size-28 md:size-40 border border-primary/30 p-2 rounded-md shadow"
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
