import { dbConnect } from "../../../../libs/dbConnect";

export async function PUT(req) {
  try {
    const { email, name, image } = await req.json();
    if (!email || !name) {
      return new Response(JSON.stringify({ error: "Email and name are required" }), { status: 400 });
    }

    const users = await dbConnect("Users"); // Make sure the collection name matches

    // Convert email to lowercase to avoid case issues
    const updated = await users.updateOne(
      { email: email.toLowerCase() },
      { $set: { name, image } }
    );

    if (updated.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    if (updated.modifiedCount === 0) {
      return new Response(JSON.stringify({ message: "No changes detected" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Profile updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Update API error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}
