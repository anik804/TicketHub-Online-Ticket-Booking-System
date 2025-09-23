import { dbConnect } from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, category, date, price, totalSeats, organizerEmail } = req.body;
    const collection = dbConnect("events");

    try {
      const result = await collection.insertOne({
        title,
        category,
        date,
        price,
        totalSeats,
        availableSeats: totalSeats,
        discount: 0,
        organizerEmail,
      });
      res.status(201).json({ message: "Event created", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
