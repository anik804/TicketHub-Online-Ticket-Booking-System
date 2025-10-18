import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";


export async function POST(req) {
 
  try {
    const form = await req.formData();
    const tranId = form.get("tran_id");

    const transactions = dbConnect("ticket-transactions");

    // find transaction before deleting (to use in redirect)
    const trx = await transactions.findOne({ tranId });
    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // delete transaction
    await tra.deleteOne({ tranId });

    // redirect to cancel page with seat & eventId
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/movie?id=${trx.eventId}`,
      { status: 303 }
    );
  } catch (err) {
    console.error("Payment cancel error:", err);
    return NextResponse.json(
      { error: "Payment cancel failed" },
      { status: 500 }
    );
  }
}
