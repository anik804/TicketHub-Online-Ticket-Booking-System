import { dbConnect } from "@/libs/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("Users");
    const users = await collection.find().sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
