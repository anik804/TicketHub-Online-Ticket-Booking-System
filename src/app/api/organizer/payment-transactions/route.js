import { dbConnect } from "@/libs/dbConnect";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const organizerEmail = searchParams.get("organizerEmail");

    if (!organizerEmail) {
      return new Response(JSON.stringify([]), { status: 200 }); // always return array
    }

    const db = await dbConnect();
    const paymentsCollection = db.collection("event-payments");
    const eventsCollection = db.collection("events");

    // Step 1: Find all events created by this organizer
    const organizerEvents = await eventsCollection
      .find({ organizerEmail })
      .project({ _id: 1 })
      .toArray();

    if (!organizerEvents.length) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const eventIds = organizerEvents.map((e) => e._id.toString());

    // Step 2: Fetch all payments for those events
    const payments = await paymentsCollection
      .find({ eventId: { $in: eventIds } })
      .sort({ paidAt: -1 })
      .toArray();

    return new Response(JSON.stringify(payments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Failed to fetch organizer payments:", error);
    return new Response(JSON.stringify([]), { status: 200 }); // always array
  }
}
