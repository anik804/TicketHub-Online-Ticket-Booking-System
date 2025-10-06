"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Button from "@/ui/Button";
import dynamic from "next/dynamic";
import { Loader2, LocateFixed } from "lucide-react";

// Dynamically import Leaflet map to avoid SSR errors
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function NearbyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPos, setUserPos] = useState(null);
  const router = useRouter();
  const mapRef = useRef();

  // Fetch nearby events from backend
  const fetchEvents = async (lat, lng) => {
    try {
      setLoading(true);
      const res = await fetch("/api/nearby-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching nearby events:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get user's current position
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPos([latitude, longitude]);
          fetchEvents(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation not supported in this browser");
      setLoading(false);
    }
  }, []);

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserPos([latitude, longitude]);
          fetchEvents(latitude, longitude);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (err) => console.error("LocateMe Error:", err)
      );
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center py-20 text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Loading Nearby Events...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Nearby Events">
      <div className="flex flex-col gap-6">
        {/* Map Section */}
        {userPos && (
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow">
            <MapContainer
              center={userPos}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {/* User Marker */}
              <Marker position={userPos}>
                <Popup>You are here</Popup>
              </Marker>

              {/* Event Markers */}
              {events.map((event) => (
                <Marker
                  key={event._id}
                  position={[event.lat, event.lng]}
                  eventHandlers={{
                    click: () => router.push(`/events/${event._id}`),
                  }}
                >
                  <Popup>
                    <strong>{event.title}</strong>
                    <br />
                    {event.location}
                    <br />
                    <span className="text-sm text-gray-500">
                      {event.distance?.toFixed(1)} km away
                    </span>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Locate Me Button */}
            <button
              onClick={handleLocateMe}
              className="absolute top-3 right-3 z-[9999] bg-white shadow-md hover:bg-gray-100 transition p-2 rounded-full"
              title="Locate Me"
            >
              <LocateFixed className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* Event List */}
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
                onClick={() => router.push(`/events/${event._id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
