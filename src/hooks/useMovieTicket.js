"use client";
import { useEffect, useState, useMemo } from "react";
import { useMovieData } from "./useMovieData";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";

export const useMovieTicket = ({
  eventId,
  seats = [],
  currency,
  totalPrice,
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const { movieData, movieLoading, movieError } = useMovieData({ id: eventId });

  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError, setTicketError] = useState(null);

  useEffect(() => {
    if (!eventId || !seats.length) {
      console.warn("⚠️ Missing eventId or seats");
      setTicketLoading(false);
      setTicketError("Missing eventId or seats");
      return;
    }

    if (sessionStatus === "loading") return; // wait for auth
    if (movieLoading) return;
  }, [eventId, seats, sessionStatus, movieLoading]);

  const movieTicket = useMemo(() => {
    if (!movieData) return null;

    const formattedDate = movieData?.date
      ? format(parseISO(movieData.date), "PPPPp")
      : "Date not available";

    return {
      id: `TICKET_${eventId?.slice(0, 6)?.toUpperCase()}_${seats.join("-")}`,
      eventId,
      title: movieData?.title || "Untitled Event",
      imageUrl: movieData?.imageUrl || null,
      date: formattedDate,
      location: movieData?.location || "Location unavailable",
      seats,
      price: totalPrice,
      currency,
      organizerEmail: movieData?.organizerEmail || "organizer@example",
      customerName: session?.user?.name || "Guest User",
      customerEmail: session?.user?.email || "guest@example.com",
    };
  }, [movieData, seats, totalPrice, currency, eventId, session?.user]);

  return { movieTicket, ticketLoading, ticketError, movieLoading, movieError };
};
