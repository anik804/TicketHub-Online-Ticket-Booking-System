import { dbConnect } from "@/libs/dbConnect";

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

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("Events");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ _id: result.insertedId, ...body }), {
      status: 201,
    });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
