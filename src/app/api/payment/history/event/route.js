
import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
 

  try {
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const paymentTransactions = dbConnect("ticket-payments");
    const transactions = await paymentTransactions.find({ eventId }).toArray();

    if (transactions.length === 0) {
      return NextResponse.json({ message: "No transactions found" }, { status: 404 });
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
