// app/api/add-movie/route.js
import { NextResponse } from "next/server";
import { dbConnect } from "../../../libs/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();

    const requiredFields = [
      "name",
      "location",
      "date",
      "time",
      "ticketPrice",
      "director",
      "writer",
      "duration",
      "category",
      "language",
      "imageUrl",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field "${field}" is required.` },
          { status: 400 }
        );
      }
    }

    const moviesCollection = await dbConnect("movies");

    const result = await moviesCollection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Movie added successfully!", id: result.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add movie error:", err);
    return NextResponse.json({ error: "Failed to add movie." }, { status: 500 });
  }
}
