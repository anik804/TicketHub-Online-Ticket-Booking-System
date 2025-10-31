import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, movieId } = body;

    if (!userId || !movieId) {
      return NextResponse.json({ error: "userId and movieId are required" }, { status: 400 });
    }

    const wishlistCollection = await dbConnect("wishlist");

    // Prevent duplicates
    const exists = await wishlistCollection.findOne({
      userId: new ObjectId(userId),
      movieId: new ObjectId(movieId),
    });
    if (exists) {
      return NextResponse.json({ error: "Movie already in wishlist" }, { status: 400 });
    }

    await wishlistCollection.insertOne({
      userId: new ObjectId(userId),
      movieId: new ObjectId(movieId),
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Added to wishlist successfully" }, { status: 201 });
  } catch (err) {
    console.error("Add to wishlist error:", err);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}
