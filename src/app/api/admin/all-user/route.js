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

export async function POST(req) {
  try {
    const body = await req.json();
    const collection = await dbConnect("Users");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ _id: result.insertedId, ...body }), {
      status: 201,
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
}
