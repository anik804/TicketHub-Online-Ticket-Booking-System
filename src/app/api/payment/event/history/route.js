import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { eventId, user, organizer, tranId } = body;

    // ✅ Build dynamic query object
    const query = {};

    if (eventId) query.eventId = eventId;
    if (user) query.paidBy = user;
    if (organizer) query.organizerEmail = organizer;
    if (tranId) query.tranId = tranId;

    // ✅ Ensure at least one filter provided
    if (Object.keys(query).length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one filter (eventId, seats, paidBy, organizerEmail, tranId) required.",
        },
        { status: 400 }
      );
    }

    const paymentTransactions = dbConnect("event-payments");
    const transactions = await paymentTransactions.find(query).toArray();

    if (!transactions.length) {
      return NextResponse.json(
        { message: "No transactions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
