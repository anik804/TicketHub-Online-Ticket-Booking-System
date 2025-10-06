"use client";

import Button from "@/ui/Button";
import PageLayout from "@/ui/PageLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NearbyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch("/api/nearby-events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          });

          const data = await res.json();
          setEvents(data);
        } catch (err) {
          console.error("Error fetching nearby events:", err);
        } finally {
          setLoading(false);
        }
      });
    } else {
      console.error("Geolocation not supported in this browser");
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <PageLayout>
        <p className="py-10 text-center">Loading Nearby Events...</p>
      </PageLayout>
    );

  return (
    <PageLayout title="Nearby Events">
      <div className="flex flex-col gap-4">
        {events.length === 0 && (
          <p className="text-center text-gray-500">No nearby events found.</p>
        )}
        {events.map((event) => (
          <div
            key={event._id}
            className="p-4 rounded-lg shadow bg-white flex flex-col md:flex-row gap-4"
          >
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p>{event.location}</p>
              {typeof event.distance === "number" && (
                <p className="text-sm text-gray-500">
                  {event.distance.toFixed(1)} km away
                </p>
              )}
            </div>
            <Button
              label={"View Details"}
              onClick={() => {
                router.push(`/events/${event._id}`);
              }}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
