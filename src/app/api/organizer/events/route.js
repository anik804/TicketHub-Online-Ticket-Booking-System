import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const collection = await dbConnect("events");
    const events = await collection.find({ organizerEmail: email }).toArray();

    // _id to string
    const mapped = events.map(e => ({ ...e, _id: e._id.toString() }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
