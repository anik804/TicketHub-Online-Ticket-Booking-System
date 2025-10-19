"use client";

import { useMemo } from "react";
import { useMovieData } from "./useMovieData";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";

export const useMovieTicket = ({ movieId, seats = [], currency, totalPrice = 0 }) => {
  const { data: session, status: sessionStatus } = useSession();
  const { movieData, movieLoading, movieError, refetch: refetchMovie } =
    useMovieData(movieId);

  // ✅ ticketLoading should consider both movie loading and session loading
  const ticketLoading = movieLoading || sessionStatus === "loading";

  // ✅ ticketError if movie error or missing seats/id
  const ticketError =
    movieError ||
    (!movieId ? "Missing event ID" : null) ||
    (!seats?.length ? "No seats selected" : null);

  // ✅ Construct the movieTicket object
  const movieTicket = useMemo(() => {
    if (!movieData || !seats?.length || ticketError) return null;

    const formattedDate = movieData.date
      ? format(parseISO(movieData.date), "PPPPp")
      : "Date not available";

    return {
      id: `TICKET_${movieId?.slice(0, 6)?.toUpperCase()}_${seats.join("-")}`,
      movieId,
      title: movieData.title || "N/A",
      imageUrl: movieData.imageUrl || null,
      date: formattedDate,
      location: movieData.location || "N/A",
      seats,
      amount: totalPrice || 0,
      price: movieData.price || 0,
      currency: currency || "N/A",
      organizerEmail: movieData.organizerEmail || "N/A",
      customerName: session?.user?.name || "N/A",
      customerEmail: session?.user?.email || "N/A",
    };
  }, [movieData, seats, totalPrice, currency, movieId, session?.user, ticketError]);

  return { movieTicket, ticketLoading, ticketError, refetchMovie };
};
