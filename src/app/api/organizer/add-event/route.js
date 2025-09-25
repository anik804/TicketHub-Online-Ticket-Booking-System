import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect"

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, category, date, price, totalSeats, organizerEmail } = body;

    if (!title || !category || !date || !price || !totalSeats || !organizerEmail) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const collection = await dbConnect("events");

    const result = await collection.insertOne({
      title,
      category,
      date,
      price,
      totalSeats,
      availableSeats: totalSeats,
      discount: 0,
      organizerEmail,
    });

    return NextResponse.json(
      { message: "Event created", id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create event failed:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
