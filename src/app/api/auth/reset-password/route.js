import { dbConnect } from "../../../../libs/dbConnect";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return new Response(JSON.stringify({ message: "Invalid request" }), { status: 400 });
    }

    const Users = await dbConnect("Users");
    const user = await Users.findOne({ resetToken: token });

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid or expired token" }), { status: 400 });
    }

    if (user.resetTokenExpiry < Date.now()) {
      return new Response(JSON.stringify({ message: "Token expired" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Users.updateOne(
      { resetToken: token },
      {
        $set: { password: hashedPassword, provider: user.provider || "credentials" },
        $unset: { resetToken: "", resetTokenExpiry: "" },
      }
    );

    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}