import { dbConnect } from "../../../../libs/dbConnect";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return new Response("Email is required", { status: 400 });

    const Users = dbConnect("Users");
    const user = await Users.findOne({ email });
    if (!user) return new Response("User not found", { status: 404 });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 mins

    // Save token and expiry in DB
    await Users.updateOne(
      { email },
      { $set: { resetToken, resetTokenExpiry, provider: user.provider || "credentials" } }
    );

    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${resetToken}`;
    console.log("Reset URL:", resetUrl); // For testing

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 30 minutes.</p>`,
    });

    return new Response(JSON.stringify({ message: "Reset link sent" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
