// app/api/upload/route.js
// import cloudinary from "@/libs/cloudinary";
import cloudinary from "@/libs/cloudinary";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      { folder: "movies" }
    );

    return new Response(JSON.stringify({ url: uploaded.secure_url }), { status: 200 });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
