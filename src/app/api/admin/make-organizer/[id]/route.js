import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  const { id } = params;

  try {
    const collection = await dbConnect("Users");

    // Update the role to "Organizer"
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: "Organizer" } }
    );

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found or already Organizer" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "User promoted to Organizer" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating user role:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update user role" }),
      { status: 500 }
    );
  }
}
