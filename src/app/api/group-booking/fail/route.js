import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

// FAIL route for group booking
export async function POST(req) {
  try {
    const body = await req.json();
    const { tranId } = body;

    if (!tranId) {
      return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });
    }

    const collection = dbConnect("payment-transactions");

    // Delete the failed transaction
    await collection.deleteOne({ tranId });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/payment/fail?tranId=${tranId}`
    );
  } catch (error) {
    console.error("❌ Fail route error:", error);
    return NextResponse.json({ error: "Fail route error" }, { status: 500 });
  }
}
