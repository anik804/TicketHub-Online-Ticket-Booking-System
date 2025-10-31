import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

// ================================
// GET: Fetch all pending cancellations
// ================================
export async function GET() {
  try {
    const collection = dbConnect("event-ticket-cancel");

    const data = await collection.find({ status: "pending" }).toArray();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching ticket cancellations:", error);
    return NextResponse.json(
      { error: "Failed to retrieve ticket cancellations." },
      { status: 500 }
    );
  }
}

// ================================
// POST: Request a ticket cancellation
// ================================
export async function POST(req) {
  try {
    const body = await req.json();
    const { tranId, userEmail, eventId, reason } = body;

    // --- Validation ---
    if (!tranId || !userEmail || !eventId) {
      return NextResponse.json(
        { error: "Missing required fields: tranId, userEmail, eventId" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("event-ticket-cancel");

    // --- Check if cancellation already exists ---
    const existingRequest = await collection.findOne({ tranId });
    if (existingRequest) {
      return NextResponse.json(
        { error: `Cancellation already ${existingRequest.status}` },
        { status: 400 }
      );
    }

    // --- Create a new cancellation request ---
    await collection.insertOne({
      tranId,
      userEmail,
      eventId,
      reason: reason || "No reason provided",
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Ticket cancellation request submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating ticket cancellation:", error);
    return NextResponse.json(
      { error: "Failed to create ticket cancellation request." },
      { status: 500 }
    );
  }
}
