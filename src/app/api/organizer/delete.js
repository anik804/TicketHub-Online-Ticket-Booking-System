import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { eventId } = req.query;
    const collection = dbConnect("events");

    try {
      await collection.deleteOne({ _id: new ObjectId(eventId) });
      res.status(200).json({ message: "Event deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
