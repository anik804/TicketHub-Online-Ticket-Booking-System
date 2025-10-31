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


//add movies route
export async function POST(req) {
  try {
    const body = await req.json();
    const moviesCollection = dbConnect("movies");
    const result = await moviesCollection.insertOne(body);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("Add movie error:", err);
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 });
  }
}