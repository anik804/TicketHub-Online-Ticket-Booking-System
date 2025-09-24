// app/api/events/[category]/route.js
import { dbConnect } from "@/libs/dbConnect";

export async function GET(req, { params }) {
  const { category } = params;

  try {
    const collection = await dbConnect("events");
    const events = await collection.find({ category }).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), { status: 500 });
  }
}
