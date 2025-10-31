"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useEventData } from "./useEventData";

export const useEventTicket = ({
  eventId,
  seatQuantity,
  currency,
  totalPrice = 0,
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const {
    eventData,
    eventLoading,
    eventError,
    refetch: refetchEvent,
  } = useEventData(eventId);

  // ✅ ticketLoading should consider both movie loading and session loading
  const ticketLoading = eventLoading || sessionStatus === "loading";

  // ✅ ticketError if movie error or missing seats/id
  const ticketError =
    eventError ||
    (!eventId ? "Missing event ID" : null);

  // ✅ Construct the movieTicket object
  const eventTicket = useMemo(() => {
    if (!eventData || !seatQuantity || ticketError) return null;

    const formattedDate = eventData.eventDateTime
      ? format(parseISO(eventData.eventDateTime), "PPPPp")
      : "Date not available";

    return {
      id: `TICKET_${eventId?.slice(0, 6)?.toUpperCase()}_${seatQuantity}`,
      eventId,
      title: eventData.title || "N/A",
      imageUrl: eventData.imageUrl || null,
      eventDateTime: formattedDate,
      location: eventData.location || "N/A",
      seatQuantity,
      totalSeats: eventData.totalSeats || 0,
      availableSeats: eventData.availableSeats || 0,
      amount: totalPrice || 0,
      price: eventData.price || 0,
      discount: eventData.discount || 0,
      currency: currency || "N/A",
      organizerEmail: eventData.organizerEmail || "N/A",
      customerName: session?.user?.name || "N/A",
      customerEmail: session?.user?.email || "N/A",
      customerPhone: session?.user?.phone || "N/A",
    };
  }, [
    eventId,
    seatQuantity,
    ticketError,
    session,
    totalPrice,
    currency,
    eventData,
  ]);

  return { eventTicket, ticketLoading, ticketError, refetchEvent };
};
