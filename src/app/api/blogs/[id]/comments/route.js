import { dbConnect } from "../../../../../libs/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession();
    if (!session)
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );

    const { comment } = await req.json();
    if (!comment)
      return new Response(
        JSON.stringify({ message: "Comment required" }),
        { status: 400 }
      );

    const blogsCol = await dbConnect("blogs");

    // Add comment
    await blogsCol.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: {
          comments: {
            user: {
              name: session.user.name,
              email: session.user.email,
            },
            text: comment,
            createdAt: new Date(),
          },
        },
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to post comment" }),
      { status: 500 }
    );
  }
}
