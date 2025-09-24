import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { eventId, totalSeats, availableSeats, price, discount } = body;

    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const collection = await dbConnect("events");
    const updateFields = {};
    if (totalSeats !== undefined) updateFields.totalSeats = totalSeats;
    if (availableSeats !== undefined) updateFields.availableSeats = availableSeats;
    if (price !== undefined) updateFields.price = price;
    if (discount !== undefined) updateFields.discount = discount;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ ...result.value, _id: result.value._id.toString() });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}
