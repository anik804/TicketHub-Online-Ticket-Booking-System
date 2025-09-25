import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const { eventId, totalSeats, availableSeats, price, decreaseSeat } = await req.json();

    if (!eventId) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const collection = await dbConnect("events");
    let updates = {};

    if (decreaseSeat) {
      // Only decrease if availableSeats > 0
      updates = { $inc: { availableSeats: -1 } };
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(eventId), availableSeats: { $gt: 0 } },
        updates,
        { returnDocument: "after" }
      );

      if (!result.value) {
        return NextResponse.json({ error: "No seats left to decrease" }, { status: 400 });
      }
      return NextResponse.json({ ...result.value, _id: result.value._id.toString() });
    }

    // For updating totalSeats, availableSeats, or price
    if (totalSeats !== undefined) updates.totalSeats = totalSeats;
    if (availableSeats !== undefined) updates.availableSeats = availableSeats;
    if (price !== undefined) updates.price = price;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: updates },
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
