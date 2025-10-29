import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const collection = dbConnect("notifications");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Notification deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete notification" }),
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const collection = dbConnect("notifications");

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return new Response(JSON.stringify({ message: "Notification updated" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update notification" }),
      { status: 500 }
    );
  }
}
