import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const collection = await dbConnect("events");
    await collection.deleteOne({ _id: new ObjectId(eventId) });

    return NextResponse.json({ message: "Event deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
