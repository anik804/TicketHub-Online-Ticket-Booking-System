// // app/api/categories/route.js
import { dbConnect } from "@/libs/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("events");
    const categories = await collection.distinct("category"); // unique categories
    console.log(categories)
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
    });
  }
}
