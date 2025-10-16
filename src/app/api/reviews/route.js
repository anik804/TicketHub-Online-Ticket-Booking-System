import { dbConnect } from "@/libs/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await dbConnect("review");
    // Recent 6 feedbacks
    const feedbacks = await collection.find().sort({ createdAt: -1 }).limit(6).toArray();
    return NextResponse.json(feedbacks);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ message: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const collection = await dbConnect("review");

    // Save login user info if provided
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    // Return saved object
    return NextResponse.json({ _id: result.insertedId, ...data });
  } catch (err) {
    console.error("Error saving review:", err);
    return NextResponse.json({ message: "Failed to save review" }, { status: 500 });
  }
}
