import { dbConnect } from "@/libs/dbConnect";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { lat, lng } = await req.json();
  if (!lat || !lng) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }
  const eventsCollection = dbConnect("events");
  const events = await eventsCollection.find({}).toArray();

  const nearby = events
    .map((event) => ({
      ...event,
      distance: haversineDistance(lat, lng, event.lat, event.lng),
    }))
    .filter((e) => e.distance <= 50) // ৫০ কিমির মধ্যে
    .sort((a, b) => a.distance - b.distance);

  return NextResponse.json(nearby);
}
