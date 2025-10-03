import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

// GET transactions (with optional filters: seat & eventId)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const seat = searchParams.get("seat");
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    if (!seat) {
      return NextResponse.json({ error: "Seat required" }, { status: 400 });
    }

    const paymentTransactions = dbConnect("payment-transactions");

    // Build query object
    const query = {};
    if (seat) query.seat = seat;
    if (eventId) query.eventId = eventId;

    const transactions = await paymentTransactions.find(query).toArray();

    if (transactions.length === 0) {
      return NextResponse.json({ status: "Transactions not found" }, { status: 404 });
    }

    return NextResponse.json(transactions[transactions.length - 1], { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
