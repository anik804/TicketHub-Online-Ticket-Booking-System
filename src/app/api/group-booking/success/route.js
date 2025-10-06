
import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const form = await req.formData();
    const tranId = form.get("tran_id");

    const paymentTransactions = dbConnect("payment-transactions");
    const eventsCollection = dbConnect("events");

    const trx = await paymentTransactions.findOne({ tranId });
    if (!trx) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

    // decrement availableSeats by number of booked seats
    const bookedSeats = trx.seats?.length || 1;
    await eventsCollection.updateOne(
      { _id: new ObjectId(trx.eventId), availableSeats: { $gte: bookedSeats } },
      { $inc: { availableSeats: -bookedSeats } }
    );

    // update transaction status
    await paymentTransactions.updateOne(
      { tranId },
      { $set: { status: "PAID", paidAt: new Date().toISOString() } }
    );

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/details?eventId=${trx.eventId}`, { status: 303 });
  } catch (err) {
    console.error("Group booking success error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
