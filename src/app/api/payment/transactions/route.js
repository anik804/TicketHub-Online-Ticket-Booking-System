import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET transactions (with optional filters: seat & eventId)
export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    const ticketTransactions = dbConnect("ticket-transactions");

    // Build query object
    const query = {};
    if (seat) query.seat = seat;
    if (eventId) query.eventId = eventId;

    const transactions = await ticketTransactions.find(query).toArray();

    if (transactions.length === 0) {
      return NextResponse.json(
        { status: "Transactions not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transactions[transactions.length - 1], {
      status: 200,
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
