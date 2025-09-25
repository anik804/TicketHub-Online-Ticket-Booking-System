import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const form = await req.formData();
    const tran_id = form.get("tran_id");
    const amount = form.get("amount");
    const status = form.get("status");

    const transactionsCollection = dbConnect("seat-transactions");
    const paymentsCollection = dbConnect("payments");
    const eventsCollection = dbConnect("events");

    // Find transaction to get eventId
    const trx = await transactionsCollection.findOne({ tran_id });
    if (!trx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }


    // Save payment
    await paymentsCollection.insertOne({
      tran_id,
      eventId: trx.eventId,
      seat: trx.seat,
      amount,
      status,
      createdAt: new Date(),
    });

    // Decrease event seat
    await eventsCollection.updateOne(
      { _id: new ObjectId(trx.eventId), availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } }
    );

    // Update transaction status
    await transactionsCollection.updateOne(
      { tran_id },
      { $set: { status: "SUCCESS" } }
    );

    // 303 redirect ensures POST → GET
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket-details?seat=${trx.seat}&eventID=${trx.eventId}`, { status: 303 });
  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
