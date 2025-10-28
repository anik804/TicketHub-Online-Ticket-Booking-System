import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

let cachedClient = global.mongoClient;
let cachedDb = global.mongoDb;

async function dbConnect() {
  if (cachedClient && cachedDb) return cachedDb;

  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
  await client.connect();
  const db = client.db("TicketHub");
  cachedClient = client;
  cachedDb = db;
  global.mongoClient = client;
  global.mongoDb = db;
  return db;
}

export async function GET() {
  try {
    const db = await dbConnect();
    const blogs = await db.collection("blogs").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { title, content, image, category } = await req.json();
    if (!title || !content) return NextResponse.json({ message: "Title and content required" }, { status: 400 });

    const db = await dbConnect();
    const newBlog = {
      title,
      content,
      image: image || null,
      category: category || "movie",
      author: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image || null,
      },
      createdAt: new Date(),
      updatedAt: null,
      likes: [],
      comments: [],
    };

    const result = await db.collection("blogs").insertOne(newBlog);
    return NextResponse.json({ ...newBlog, _id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create blog", error: error.message }, { status: 500 });
  }
}
