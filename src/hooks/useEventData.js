"use client";

import { useState, useEffect, useCallback } from "react";

export const useEventData = ({ eventId }) => {
  const [eventData, setEventData] = useState(null);
  const [eventLoading, setEventLoading] = useState(false);
  const [eventError, setEventError] = useState(null);

  console.log("Event ID:", eventId);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;

    setEventLoading(true);
    setEventError(null);

    try {
      const res = await fetch(`/api/browse-event/${eventId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch event: ${res.statusText}`);
      }

      const data = await res.json();
      setEventData(data);
    } catch (err) {
      console.error("❌ Event fetch error:", err);
      setEventError(
        err.message || "Something went wrong while fetching event data."
      );
    } finally {
      setEventLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    eventData,
    eventLoading,
    eventError,
    fetchEvent,
  };
};
