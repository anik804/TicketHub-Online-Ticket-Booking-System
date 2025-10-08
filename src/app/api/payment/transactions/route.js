import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const seatParam = searchParams.get("seats");

    if (!eventId || !seatParam) {
      return NextResponse.json(
        { error: "Event ID and seats required" },
        { status: 400 }
      );
    }

    const seats = seatParam.startsWith("[")
      ? JSON.parse(decodeURIComponent(seatParam))
      : [seatParam];

    const transactions = dbConnect("ticket-transactions");
    if (!transactions) {
      return NextResponse.json(
        { error: "Failed to connect to database" },
        { status: 500 }
      );
    }

    const result = await transactions
      .find({
        eventId,
        seats: { $in: seats },
        status: "SUCCESS",
      })
      .toArray();

    // সবশেষ successful transaction (seat-wise) return
    return NextResponse.json(result[result.length - 1] || null, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}
