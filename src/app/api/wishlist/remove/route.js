import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const body = await req.json();
    const { userId, movieId } = body;

    if (!userId || !movieId) {
      return NextResponse.json({ error: "userId and movieId are required" }, { status: 400 });
    }

    const wishlistCollection = await dbConnect("wishlist");

    const deleted = await wishlistCollection.deleteOne({
      userId: new ObjectId(userId),
      movieId: new ObjectId(movieId),
    });

    if (deleted.deletedCount === 0) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Removed from wishlist successfully" }, { status: 200 });
  } catch (err) {
    console.error("Delete wishlist error:", err);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
