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

    const blogsCol = await dbConnect("blogs");
    const blog = await blogsCol.findOne({ _id: new ObjectId(params.id) });

    if (!blog)
      return new Response(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404 }
      );

    const userEmail = session.user.email;
    const alreadyLiked = blog.likes?.some((l) => l.email === userEmail);

    const update = alreadyLiked
      ? { $pull: { likes: { email: userEmail } } }
      : { $push: { likes: { email: userEmail, name: session.user.name } } };

    await blogsCol.updateOne({ _id: new ObjectId(params.id) }, update);

    return new Response(
      JSON.stringify({ success: true, liked: !alreadyLiked }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Failed to toggle like" }),
      { status: 500 }
    );
  }
}
