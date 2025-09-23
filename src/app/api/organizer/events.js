import { dbConnect } from "@/lib/dbConnect";

export default async function handler(req, res) {
  const { email } = req.query;
  const collection = dbConnect("events");

  if (req.method === "GET") {
    try {
      const events = await collection.find({ organizerEmail: email }).toArray();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
