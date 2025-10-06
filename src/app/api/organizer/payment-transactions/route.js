
 // তোমার MongoDB কানেকশন ফাইল
 // payment-transactions মডেল
import { dbConnect } from "@/libs/dbConnect";

export async function GET() {
  try {
    // Connect to the "payment-transactions" collection
    const collection = dbConnect("payment-transactions");

    // Fetch all payment records
    const payments = await collection.find({}).toArray();

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch payment history:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
