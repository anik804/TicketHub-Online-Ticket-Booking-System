import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { eventId, totalSeats, price, discount } = req.body;
    const collection = dbConnect("events");

    try {
      const updatedEvent = await collection.findOneAndUpdate(
        { _id: new ObjectId(eventId) },
        { $set: { totalSeats, price, discount } },
        { returnDocument: "after" }
      );

      res.status(200).json(updatedEvent.value);
    } catch (err) {
      res.status(500).json({ error: "Failed to update event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
