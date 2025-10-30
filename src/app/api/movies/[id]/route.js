import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnect } from "../../../../libs/dbConnect";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const moviesCollection = await dbConnect("movies");

    const updated = await moviesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );

    if (updated.modifiedCount === 0) {
      return NextResponse.json({ error: "Movie not found or no changes made" }, { status: 404 });
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
