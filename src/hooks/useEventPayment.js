"use client";

import { useQuery } from "@tanstack/react-query";

export const useEventPayment = ({
  eventId,
  seatQuantity,
  user,
  organizer,
  tranId,
}) => {
  // ✅ Build a stable query key so React Query caches properly
  const queryKey = [
    "paymentHistory",
    { eventId, user, organizer, tranId },
  ];

  // ✅ Query function to fetch data
  const fetchPaymentHistory = async () => {
    // Ensure at least one filter is provided
    if (
      !eventId &&
      !tranId &&
      !user &&
      !organizer
    ) {
      return [];
    }

    const body = JSON.stringify({ eventId, user, organizer, tranId });

    const res = await fetch(`/api/payment/event/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(
        errData.error || errData.message || "Failed to fetch payment history"
      );
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  };

  const {
    data: paymentHistory = [],
    isLoading: paymentLoading,
    error,
    refetch, // ✅ Manual refetch
  } = useQuery({
    queryKey,
    queryFn: fetchPaymentHistory,
    enabled: !!(
      eventId ||
      tranId ||
      user ||
      organizer ||
      seatQuantity
    ), // only fetch if at least one filter provided
    retry: 1, // retry once on failure
    refetchOnWindowFocus: true, // don't refetch on window focus
  });

  return { paymentHistory, paymentLoading, error, refetch };
};
