import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

//check payments status
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tranId = searchParams.get("tran_id");
    const ticket = searchParams.get("ticket");

    if (!tranId && !ticket) {
      return NextResponse.json(
        { error: "Transaction ID & Ticket Name required" },
        { status: 400 }
      );
    }

    const paymentTransactions = dbConnect(`${ticket}-payments`);
    const payment = await paymentTransactions.findOne({ tranId });

    if (!payment) {
      return NextResponse.json({ status: "NOT FOUND" }, { status: 404 });
    }

    return NextResponse.json(payment, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}
