import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = dbConnect("review");
    const feedbacks = await collection.find().sort({ _id: -1 }).toArray();

    return Response.json(feedbacks);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch reviews" }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const collection = dbConnect("review");

    await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving review:", error);
    return new Response(JSON.stringify({ message: "Failed to save review" }), { status: 500 });
  }
}
