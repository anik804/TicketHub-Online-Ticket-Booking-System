import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnect } from "../../../../libs/dbConnect";

export async function GET(request, { params }) {

  const { id } = await params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const collection = await dbConnect("movies");
    const event = await collection.findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    console.log("PUT params ID:", id);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const body = await req.json();

    delete body._id; // Remove _id if accidentally included

    const moviesCollection = await dbConnect("movies");

    const updated = await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );

    console.log("Mongo update result:", updated);

    if (updated.matchedCount === 0) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Movie updated successfully" }, { status: 200 });
  } catch (err) {
    console.error("Update movie error:", err);
    return NextResponse.json({ error: "Failed to update movie" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const moviesCollection = await dbConnect("movies");
    const deleted = await moviesCollection.deleteOne({ _id: new ObjectId(id) });

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Delete movie error:", err);
    return NextResponse.json({ error: "Failed to delete movie" }, { status: 500 });
  }
}
