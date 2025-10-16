import { dbConnect } from "../../../../libs/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, password, photo, role } = data;

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const Users = dbConnect("Users");

    // Check if user exists
    const existing = await Users.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      phone,
      password: hashedPassword,
      photo: photo || "",
      role: role || "user",
      createdAt: new Date(),
    };

    await Users.insertOne(newUser);

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
