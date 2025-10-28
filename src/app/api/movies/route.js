import { NextResponse } from "next/server";
import { dbConnect } from "../../../libs/dbConnect";

export async function GET() {
  try {
    const moviesCollection = dbConnect("movies");
    const movies = await moviesCollection.find({}).toArray();
    return NextResponse.json(movies, { status: 200 });
  } catch (err) {
    console.error("Fetch movies error:", err);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
