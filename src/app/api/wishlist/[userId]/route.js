import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    const wishlistCollection = await dbConnect("wishlist");
    
    // Get all wishlist entries for this user
    const wishlist = await wishlistCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    
    // Populate movie details
    const moviesCollection = await dbConnect("movies");
    const movies = await Promise.all(
      wishlist.map(async (w) => {
        const movie = await moviesCollection.findOne({ _id: new ObjectId(w.movieId) });
        return movie ? { ...movie, _id: movie._id.toString() } : null;
      })
    );

    return NextResponse.json(movies.filter(Boolean), { status: 200 });
  } catch (err) {
    console.error("Fetch wishlist error:", err);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}
