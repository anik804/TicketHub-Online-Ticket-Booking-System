import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

export async function POST(req) {
  try {
    const form = await req.formData();
    const tranId = form.get("tran_id");

    const url = new URL(req.url);
    const ticket = url.searchParams.get("ticket");

    const transactions = dbConnect(`${ticket}-transactions`); // ← fix

    // find transaction before deleting
    const trx = await transactions.findOne({ tranId });
    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // delete transaction
    await transactions.deleteOne({ tranId });

    if(ticket === "movie"){
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/movie?id=${trx.movieId}`,
        { status: 303 }
      );
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/event?id=${trx.eventId}`,
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
