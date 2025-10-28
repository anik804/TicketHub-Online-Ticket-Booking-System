import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  const { id } = await params;

  try {
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const collection = await dbConnect("events");
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
// import { dbConnect } from "@/libs/dbConnect";
// import { ObjectId } from "mongodb";

// // 🔹 GET → একক event আনবে
// export async function GET(req, { params }) {
//   try {
//     const { id } = params;
//     const collection = await dbConnect("events");

//     const event = await collection.findOne({ _id: new ObjectId(id) });

//     if (!event) {
//       return new Response(JSON.stringify({ error: "Event not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify(event), { status: 200 });
//   } catch (error) {
//     console.error("❌ Error fetching event:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch event" }), {
//       status: 500,
//     });
//   }
// }
