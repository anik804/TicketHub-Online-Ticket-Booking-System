import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

// ===========================
// Haversine formula for distance (in km)
// ===========================
function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// ===========================
// POST method - Find nearby events
// ===========================
export async function POST(req) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { lat, lng } = await req.json();

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Invalid coordinates" },
        { status: 400 }
      );
    }

    // Connect to DB

    const eventsCollection = dbConnect("events");

    // Fetch all events
    const events = await eventsCollection.find({}).toArray();

    console.log("Received coordinates:", lat, lng);
    console.log("Total events found:", events.length);

    if (events.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Calculate distance for each event
    const nearby = events
      .map((event) => {
        // Extract and parse coordinates
        const eventLat =
          parseFloat(event.lat) ||
          parseFloat(event.latitude) ||
          event.coords?.lat ||
          0;
        const eventLng =
          parseFloat(event.lng) ||
          parseFloat(event.longitude) ||
          event.coords?.lng ||
          0;

        const distance = haversineDistance(lat, lng, eventLat, eventLng);

        return {
          ...event,
          distance: parseFloat(distance.toFixed(2)), // 2 decimal places
        };
      })
      .filter((e) => e.distance <= 50) // within 50 km
      .sort((a, b) => a.distance - b.distance);

    console.log("Nearby events:", nearby.length);

    return NextResponse.json(nearby, { status: 200 });
  } catch (error) {
    console.error("Error fetching nearby events:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby events" },
      { status: 500 }
    );
  }
}
