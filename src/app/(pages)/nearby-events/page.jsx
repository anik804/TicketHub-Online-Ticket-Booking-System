"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/ui/PageLayout";
import Button from "@/ui/Button";
import dynamic from "next/dynamic";
import { Loader2, LocateFixed, MapPin, CalendarDays, Clock, Map } from "lucide-react";
import { format, parseISO } from "date-fns";

// Dynamically import Leaflet map
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
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function NearbyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [userPos, setUserPos] = useState(null);
  const router = useRouter();
  const mapRef = useRef();

  // Fetch nearby events from backend
  const fetchEvents = async (lat, lng) => {
    try {
      const res = await fetch("/api/nearby-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching nearby events:", err);
    }
  };

  // Get user location
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.error("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);
        fetchEvents(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLoading(false);
      }
    );
  }, []);

  const handleLocateMe = () => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 13);
        }
      },
      (err) => console.error("LocateMe error:", err)
    );
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center py-20 text-gray-600 gap-2">
          <Loader2 className="animate-spin" /> Loading Nearby Events...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Nearby Events">
      <div className="flex flex-col gap-6">

        {/* Event Cards */}
        <div className="flex flex-col gap-4">
          {events.length === 0 && (
            <p className="text-center text-gray-500">No nearby events found.</p>
          )}
          {events.map((event) => (
            <div
              key={event._id}
              className="p-4 rounded-lg shadow-md bg-white flex flex-col md:flex-row justify-between items-center md:items-end gap-4 hover:shadow-xl transition"
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {event.title}
                </h3>
                <p className="flex items-center gap-1 text-gray-600 ml-2">
                  <MapPin className="size-4" /> {event.location}
                </p>
                <p className="flex items-center gap-1 text-gray-600 ml-2">
                  <CalendarDays className="size-4" /> {format(parseISO(event.date), "PPPPp")}
                </p>
                {typeof event.distance === "number" && (
                  <p className="flex items-center gap-1 text-sm text-gray-500 ml-2">
                    <Clock className="size-4" /> {event.distance.toFixed(1)} km away
                  </p>
                )}
              </div>
              <Button
                label={"View Details"}
                onClick={() => router.push(`/browse-events/${event._id}`)}
              />
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow">
          {mapLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <Map className="size-12 text-gray-400 animate-bounce" />
              <span className="ml-2 text-gray-500">Loading Map...</span>
            </div>
          )}
          {userPos && (
            <MapContainer
              center={userPos}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
                setMapLoading(false); // Map is ready
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <Marker position={userPos}>
                <Popup>You are here</Popup>
              </Marker>
              {events.map((event) => (
                <Marker
                  key={event._id}
                  position={[event.lat, event.lng]}
                  eventHandlers={{
                    click: () => router.push(`/event/${event._id}`),
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
          )}

          {/* Locate Me Button */}
          <button
            onClick={handleLocateMe}
            className="absolute top-3 right-3 z-[20] bg-white shadow-md hover:bg-gray-100 transition p-2 rounded-full"
            title="Locate Me"
          >
            <LocateFixed className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
