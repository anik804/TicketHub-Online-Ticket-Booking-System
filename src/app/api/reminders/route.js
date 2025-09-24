import { dbConnect } from "@/libs/dbConnect";



// POST → Create Reminder
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = dbConnect("reminders");

    // Insert reminder
    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
      status: "Sent ✅",
    });

    return new Response(JSON.stringify({ _id: result.insertedId, ...body }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error inserting reminder:", error);
    return new Response(JSON.stringify({ error: "Failed to add reminder" }), {
      status: 500,
    });
  }
}

// GET → Fetch All Reminders
export async function GET() {
  try {
    const collection = dbConnect("reminders");
    const reminders = await collection.find().sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(reminders), { status: 200 });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch reminders" }), {
      status: 500,
    });
  }
}
