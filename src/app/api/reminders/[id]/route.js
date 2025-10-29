import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const collection = dbConnect("reminders");

    await collection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Reminder deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete reminder" }),
      { status: 500 }
    );
  }
}
