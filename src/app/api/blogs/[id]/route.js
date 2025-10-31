import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


let cachedClient = global.mongoClient;
let cachedDb = global.mongoDb;

async function dbConnect() {
  if (cachedClient && cachedDb) return cachedDb;

  try {
    const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
    await client.connect();
    const db = client.db("TicketHub"); // use your DB name
    cachedClient = client;
    cachedDb = db;
    global.mongoClient = client;
    global.mongoDb = db;
    console.log("MongoDB connected successfully");
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export async function GET(req, { params }) {
  try {
    const db = await dbConnect();
    const blog = await db
      .collection("blogs")
      .findOne({ _id: new ObjectId(params.id) });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET by ID Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session for update:", session);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: please login first" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Update body:", body);

    const db = await dbConnect();
    const result = await db.collection("blogs").updateOne(
      {
        _id: new ObjectId(params.id),
        "author.email": session.user.email, // Only owner can update
      },
      { $set: { ...body, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Blog not found or not authorized" },
        { status: 404 }
      );
    }

    console.log("Blog updated:", params.id);
    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Failed to update blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session for delete:", session);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: please login first" },
        { status: 401 }
      );
    }

    const db = await dbConnect();
    const result = await db.collection("blogs").deleteOne({
      _id: new ObjectId(params.id),
      "author.email": session.user.email, // Only owner can delete
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Blog not found or not authorized" },
        { status: 404 }
      );
    }

    console.log("Blog deleted:", params.id);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete blog", error: error.message },
      { status: 500 }
    );
  }
}
