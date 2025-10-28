"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import {
  Loader2,
  LocateFixed,
  MapPin,
  CalendarDays,
  Clock,
  Map,
} from "lucide-react";

import PageLayout from "@/ui/PageLayout";
import Button from "@/ui/Button";

import "@/libs/leafletFix";

import L from "leaflet";

// ✅ Import Leaflet CSS globally (required!)
import "leaflet/dist/leaflet.css";
import { HiInformationCircle } from "react-icons/hi2";

// ✅ Dynamically import Leaflet components (client-only)
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
  const [mapReady, setMapReady] = useState(false);
  const [userPos, setUserPos] = useState(null);
  const mapRef = useRef(null);
  const router = useRouter();

  const customIcon = L.icon({
    iconUrl: "/images/mappin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  });

  // ✅ Fetch nearby events
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

  // ✅ Get user location
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

  // ✅ Handle “Locate Me” button
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

  // ✅ Loading state
  if (loading) {
    return (
      <PageLayout className="flex h-[70vh] justify-center items-center text-gray-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Fetching nearby events...
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Nearby Events">
      <div className="flex flex-col gap-8">
        {/* Map Section */}
        <section className="relative h-72 rounded-lg overflow-hidden shadow-sm border border-primary/30 z-10">
          {!mapReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-300 z-10">
              <Map className="size-10 opacity-50 animate-bounce" />
              <span className="opacity-70 mt-2">Loading map...</span>
            </div>
          )}

          {userPos && (
            <MapContainer
              center={userPos}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => {
                mapRef.current = map;
                setMapReady(true);
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />

              <Marker position={userPos} icon={customIcon}>
                <Popup>
                  <strong>You are here</strong>
                </Popup>
              </Marker>

              {events.map((event) => (
                <Marker
                  key={event._id}
                  icon={customIcon}
                  position={[event.lat, event.lng]}
                  eventHandlers={{
                    click: () => router.push(`/browse-events/${event._id}`),
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{event.title}</strong>
                      <br />
                      {event.location}
                      <br />
                      <span className="text-xs text-gray-500">
                        {event.distance?.toFixed(1)} km away
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}

          {/* Locate Me Button */}
          <button
            onClick={handleLocateMe}
            className="absolute top-3 right-3 z-[1000] bg-white hover:bg-gray-50 border border-gray-200 shadow-sm p-2 rounded-full transition-all"
            title="Locate Me"
          >
            <LocateFixed className="w-5 h-5 text-gray-700" />
          </button>

          {/* Information */}
          <div className="absolute bottom-2 left-2 z-[1000] bg-base-100 rounded-full py-2 px-4 flex items-center gap-2 opacity-60 shadow-sm">
            <HiInformationCircle className="size-4 " />
            <span className=" text-sm">Click on markers to view details</span>
          </div>
        </section>
        {/* Events List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 && (
            <div className="text-center text-primary py-12 md:col-span-2">
              No nearby events found around your area.
            </div>
          )}

          {events.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 bg-base-200 border border-primary/20 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1 ">{event.title}</h3>
                <p className="flex items-center gap-1 text-sm opacity-80">
                  <MapPin className="size-4" /> {event.location}
                </p>
                <p className="flex items-center gap-1 text-sm opacity-80">
                  <CalendarDays className="size-4" />{" "}
                  {format(parseISO(event.eventDateTime), "PPpp")}
                </p>
                {typeof event.distance === "number" && (
                  <p className="flex items-center gap-1 text-sm opacity-80">
                    <Clock className="size-4" /> {event.distance.toFixed(1)} km
                    away
                  </p>
                )}
              </div>
              <div className="mt-5">
                <Button
                  label="View Details"
                  onClick={() => router.push(`/browse-events/${event._id}`)}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </PageLayout>
  );
}
