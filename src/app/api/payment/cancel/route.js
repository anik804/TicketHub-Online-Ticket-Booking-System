import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

/**
 * ================================
 * GET: Fetch all pending cancellation requests
 * ================================
 */
export async function GET() {
  try {
    const collection = await dbConnect("event-ticket-cancel");

    const data = await collection.find({ status: "pending" }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching ticket cancellations:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve ticket cancellations." },
      { status: 500 }
    );
  }
}

/**
 * ================================
 * POST: Create a new cancellation request
 * ================================
 */
export async function POST(req) {
  try {
    const { tranId, customerEmail } = await req.json();

    if (!tranId || !customerEmail) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (tranId or customerEmail)" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("event-ticket-cancel");

    // Prevent duplicate cancellation
    const existing = await collection.findOne({ tranId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: `Cancellation already ${existing.status}` },
        { status: 400 }
      );
    }

    // Insert new request
    await collection.insertOne({
      tranId,
      customerEmail,
      status: "pending",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Ticket cancellation request submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating ticket cancellation:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create ticket cancellation request." },
      { status: 500 }
    );
  }
}

/**
 * ================================
 * PATCH: Approve or Reject a Cancellation
 * ================================
 */
export async function PATCH(req) {
  try {
    const { id, action } = await req.json();

    // ✅ Input validation
    if (!id || !action) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (id or action)" },
        { status: 400 }
      );
    }

    const cancelCollection = await dbConnect("event-ticket-cancel");
    const paymentCollection = await dbConnect("event-payments");

    // ✅ Find the cancellation record
    const cancelRecord = await cancelCollection.findOne({ _id: new ObjectId(id) });
    if (!cancelRecord) {
      return NextResponse.json(
        { success: false, message: "Cancellation request not found." },
        { status: 404 }
      );
    }

    const { tranId } = cancelRecord;
    let updateDoc = {};
    let message = "";

    // ✅ Handle approve/reject
    if (action === "approve") {
      updateDoc = { $set: { status: "approved" } };
      message = "✅ Ticket cancellation approved successfully.";

      // 🔥 Delete payment record using tranId
      const deleteResult = await paymentCollection.deleteOne({ tranId });
      if (deleteResult.deletedCount === 0) {
        console.warn(`⚠️ No payment found to delete for tranId: ${tranId}`);
      }

    } else if (action === "reject") {
      updateDoc = { $set: { status: "rejected" } };
      message = "❌ Ticket cancellation rejected.";
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action. Use 'approve' or 'reject'." },
        { status: 400 }
      );
    }

    // ✅ Update cancellation status
    const updateResult = await cancelCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDoc
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "No matching record found or already updated." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error updating cancellation status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update ticket status." },
      { status: 500 }
    );
  }
}
