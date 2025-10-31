"use client";
import { useQuery } from "@tanstack/react-query";

export const useEventData = (id) => {
  const {
    data: eventData,
    isLoading: eventLoading,
    error: eventError,
    refetch, // ✅ Allows manual re-fetching
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/browse-event/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Event fetch failed: ${res.statusText}`);
      const data = await res.json();
      return data;
    },
    enabled: !!id,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  return { eventData, eventLoading, eventError, refetch };
};
