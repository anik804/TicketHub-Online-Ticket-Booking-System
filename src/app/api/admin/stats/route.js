import { dbConnect } from "@/libs/dbConnect";

export async function GET() {
  try {
    const collection = dbConnect("Users");
    const collection2 = dbConnect("events");

    // Count users by role
    const totalUsers = await collection.countDocuments({ role: "User" });
    const totalOrganizers = await collection.countDocuments({
      role: "Organizer",
    });
    const totalEvents = await collection2.countDocuments();

    return new Response(
      JSON.stringify({ totalUsers, totalOrganizers, totalEvents }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
