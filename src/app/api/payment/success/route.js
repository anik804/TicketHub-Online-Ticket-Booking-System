import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {

  try {
    const form = await req.formData();
    const tranId = form.get("tran_id");

    const paymentTransactions = dbConnect("payment-transactions");
    const eventsCollection = dbConnect("events");

    // Find transaction to get eventId
    const trx = await paymentTransactions.findOne({ tranId });
    if (!trx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }


    // Decrease event seat
    await eventsCollection.updateOne(
      { _id: new ObjectId(trx.eventId), availableSeats: { $gt: 0 } },
      { $inc: { availableSeats: -1 } }
    );

    // Update transaction status
    await paymentTransactions.updateOne(
      { tranId },
      { $set: { status: "PAID", paidAt: new Date().toISOString() } }
    );

    // 303 redirect ensures POST → GET
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/ticket/details?seat=${trx.seat}&eventId=${trx.eventId}`, { status: 303 });
  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
