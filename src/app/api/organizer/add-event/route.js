// import { NextResponse } from "next/server";
// import { dbConnect } from "@/libs/dbConnect"

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { title, category, date, price, totalSeats, organizerEmail } = body;

//     if (!title || !category || !date || !price || !totalSeats || !organizerEmail) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     const collection = await dbConnect("events");

//     const result = await collection.insertOne({
//       title,
//       category,
//       date,
//       price,
//       totalSeats,
//       availableSeats: totalSeats,
//       discount: 0,
//       organizerEmail,
//     });

//     return NextResponse.json(
//       { message: "Event created", id: result.insertedId.toString() },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Create event failed:", err);
//     return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
//   }
// }


import { dbConnect } from "@/libs/dbConnect";

// ✅ Create new Event (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("events");

  const newEvent = {
  title: body.title,
  eventDateTime: body.eventDateTime,
  location: body.location,
  price: Number(body.price),
  desc: body.desc,
  category: body.category,
  imageUrl: body.imageUrl || "",
  totalSeats: Number(body.totalSeats) || 0,
  availableSeats: Number(body.availableSeats) || 0,
  discount: Number(body.discount) || 0,
  organizerEmail: req.user.email, // logged-in user email override
  createdAt: new Date(),
};



    const result = await collection.insertOne(newEvent);

    return new Response(
      JSON.stringify({ message: "✅ Event added successfully!", event: newEvent }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding event:", error);
    return new Response(JSON.stringify({ error: "Failed to add event" }), {
      status: 500,
    });
  }
}

// ✅ Get All Events (GET)
export async function GET() {
  try {
    const collection = await dbConnect("events");
    const events = await collection.find().sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}

