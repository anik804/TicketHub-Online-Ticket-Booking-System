import { dbConnect } from "@/libs/dbConnect";

// GET → Fetch user notifications
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const collection = dbConnect("notifications");
    const notifications = await collection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch notifications" }),
      { status: 500 }
    );
  }
}

// POST → Create notification
export async function POST(req) {
  try {
    const body = await req.json();
    const collection = dbConnect("notifications");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
      isRead: false,
    });

    return new Response(
      JSON.stringify({ _id: result.insertedId, ...body }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create notification" }),
      { status: 500 }
    );
  }
}
