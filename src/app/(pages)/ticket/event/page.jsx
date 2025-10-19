"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Image from "next/image";
import { TbTicketOff } from "react-icons/tb";
import {
  MapPin,
  CalendarDays,
  CircleDollarSign,
  SeparatorHorizontal,
} from "lucide-react";
import { FaInfoCircle } from "react-icons/fa";
import Button from "@/ui/Button";
import EventCheckout from "@/components/ticket/EventChekout";
import { useEventTicket } from "@/hooks/useEventTicket";
import { MdEventSeat } from "react-icons/md";

export default function EventTicketPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [seatQuantity, setSeatQuantity] = useState(1);

  const [currency, setCurrency] = useState("BDT");
  const [totalPrice, setTotalPrice] = useState(0);
  const [converting, setConverting] = useState(false);
  const currencies = ["BDT", "USD", "EUR", "GBP", "INR", "AUD", "CAD"];

  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: id,
    seatQuantity,
    currency,
    totalPrice,
  });

  // Currency Conversion
  useEffect(() => {
    if (!eventTicket?.price) return;

    setConverting(true);
    fetch(
      `https://v6.exchangerate-api.com/v6/5d75648c6024f50ca5e6c413/pair/BDT/${currency}/${eventTicket.price}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success")
          setTotalPrice(Number(data.conversion_result) * seatQuantity);
        else setTotalPrice(eventTicket.price * seatQuantity);
      })
      .catch(() => setTotalPrice(eventTicket.price * seatQuantity))
      .finally(() => setConverting(false));
  }, [currency, eventTicket?.price, seatQuantity]);


  if (ticketLoading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">
            Loading seats and event details...
          </p>
        </div>
      </PageLayout>
    );
  }

  if (ticketError || !eventTicket) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-700">
            Event not found or removed.
          </h2>
        </div>
      </PageLayout>
    );
  }

  const isAvailable =
    eventTicket?.availableSeats > 0 &&
    eventTicket?.availableSeats >= seatQuantity;

  return (
    <PageLayout
      className="max-w-5xl flex flex-col gap-6 md:gap-10"
      imageURL={eventTicket.imageUrl}
      title={eventTicket.title}
    >
      <div className="bg-base-100 border border-primary/20 rounded-md shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-full md:w-1/3 h-56 rounded-md overflow-hidden shadow-md">
          <Image
            src={eventTicket.imageUrl}
            alt={eventTicket.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 text-gray-700 dark:text-gray-200">
          <p className="flex items-center gap-2">
            <MapPin className="size-4" />
            {eventTicket.location || "Unknown Location"}
          </p>

          <p className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            {eventTicket.date}
          </p>

          <p className="flex items-center gap-2 text-lg font-semibold mt-2">
            <CircleDollarSign className="size-5" /> {eventTicket.price} BDT /
            seat
          </p>

          {/* Seat Quantity Dropdown */}
          {isAvailable && (
            <div className="flex flex-col gap-1">
              <p>Total Seat : {eventTicket.totalSeats}</p>
              <p>Available Seat : {eventTicket.availableSeats}</p>
              <div className="flex items-center gap-2 text-lg font-semibold mt-2">
                <MdEventSeat className="size-5" />
                <select
                  id="number"
                  value={seatQuantity}
                  onChange={(e) => setSeatQuantity(Number(e.target.value))}
                  className="border border-primary/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <FaInfoCircle className="size-3" /> A user can book up to 5
                seats.
              </p>
            </div>
          )}

          {isAvailable || (
            <div className="flex items-center gap-2 text-lg font-semibold mt-2">
              <TbTicketOff className="size-5" />
              NO SEAT AVAILABLE
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <Button
              label="View Details"
              onClick={() => router.push(`/browse-events/${id}`)}
              className="w-fit"
            />

            {isAvailable && (
              <div className="flex items-center justify-between gap-2 mt-4 mb-2">
                <p className="text-lg">
                  Total Price :{" "}
                  {converting
                    ? "Converting..."
                    : `${currency} ${totalPrice.toFixed(2)}`}
                </p>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border border-primary/20 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
              </div>
            )}

            {isAvailable && (
              <EventCheckout
                eventTicket={eventTicket}
                disabled={!isAvailable}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
