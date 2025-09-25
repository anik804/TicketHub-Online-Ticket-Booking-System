import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

// GET transactions (with optional filters: seat & eventId)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const seat = searchParams.get("seat");
    const eventId = searchParams.get("eventId");

    const collection = dbConnect("seat-transactions");

    // Build query object
    const query = {};
    if (seat) query.seat = seat;
    if (eventId) query.eventId = eventId;

    const transactions = await collection.find(query).toArray();

    return NextResponse.json(transactions, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
