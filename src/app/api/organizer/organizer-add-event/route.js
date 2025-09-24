import { dbConnect } from "@/libs/dbConnect";

// GET → সব events ফেচ করার জন্য
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

// POST → নতুন event create করার জন্য
export async function POST(req) {
  try {
    const body = await req.json();

    // validation
    if (!body.title || !body.date || !body.location || !body.price || !body.desc) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 }
      );
    }

    const collection = await dbConnect("events");
    const result = await collection.insertOne({
      ...body,
      price: Number(body.price),
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ _id: result.insertedId, ...body }),
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating event:", error);
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
