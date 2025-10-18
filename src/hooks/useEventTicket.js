"use client";
import { useEffect, useState } from "react";

export const useTicketData = ({eventId, seats}) => {
    const [ticketData, setTicketData] = useState(null);
    
    const [event, setEvent] = useState(null);
    // 🔹 Fetch event details once
      useEffect(() => {
        if (!eventId) return;
        async function fetchEvent() {
          try {
            const res = await fetch(`/api/browse-event/${eventId}`);
            const data = await res.json();
            setEvent(data);
            setSeats(generateSeatLayout(data.totalSeats || 100));
          } catch (err) {
            console.error("Failed to load event:", err);
          }
        }
        fetchEvent();
      }, [eventId]);
}