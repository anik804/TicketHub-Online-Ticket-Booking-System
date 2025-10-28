import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

// CANCEL route for group booking
export async function POST(req) {
  try { 
    const body = await req.json();
    const { tranId } = body;

    if (!tranId) {
      return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });
    }

    const collection = dbConnect("payment-transactions");

    // Delete the cancelled transaction
    await collection.deleteOne({ tranId });

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard/payment/cancel?tranId=${tranId}`
    );
  } catch (error) {
    console.error("❌ Cancel route error:", error);
    return NextResponse.json({ error: "Cancel route error" }, { status: 500 });
  }
}
