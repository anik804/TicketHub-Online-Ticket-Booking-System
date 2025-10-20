import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const form = await req.formData();
    const tranId = form.get("tran_id");

    const transactions = dbConnect("movie-transactions");
    const payments = dbConnect("movie-payments");
    const eventsCollection = dbConnect("events");

    // Find transaction to get eventId and seats
    const trx = await transactions.findOne({ tranId });
    if (!trx) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    const seatsPurchased = Array.isArray(trx.seats) ? trx.seats : [trx.seats];
    const numberOfSeats = seatsPurchased.length;

    // Decrease availableSeats in the event by number of seats purchased
    const updateResult = await eventsCollection.updateOne(
      {
        _id: new ObjectId(trx.movieId),
        availableSeats: { $gte: numberOfSeats },
      },
      { $inc: { availableSeats: -numberOfSeats } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Not enough seats available" },
        { status: 400 }
      );
    }

    // Update transaction status
    await transactions.updateOne(
      { tranId },
      { $set: { status: "SUCCESS", paidAt: new Date().toISOString() } }
    );

    // Add payment record
    await payments.insertOne({
      tranId,
      movieId: trx.movieId,
      seats: seatsPurchased, // store all purchased seats
      paidBy: trx.email,
      organizerEmail: trx.organizerEmail,
      amount: trx.amount,
      status: "PAID",
      currency: trx.currency,
      paidAt: new Date().toISOString(),
    });

    // --------------- Send Success Email ----------------

    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: trx.email,
        subject: `Ticket Hub Movie Payment Successful`,
        html: `
              <div style="font-family:Arial,sans-serif;line-height:1.6">
                <h2 style="color:#d96c2c;">Payment Successful!</h2>
                <p>Hello Dear,</p>
                <p>Your payment has been successfully processed for Movie:</p>
                <ul>
                  <li><b>Transaction ID:</b> ${tranId}</li>
                  <li><b>Movie ID:</b> ${trx.movieId}</li>
                  <li><b>Total Seats:</b> ${trx.seats
                    .map((seat) => seat)
                    .join(", ")}</li>
                  <li><b>Amount:</b> ${trx.amount.toFixed(2)} ${
          trx.currency
        }</li>
                  <li><b>Date:</b> ${trx.paidAt}</li>
                </ul>
                <p>Thank you for your purchase! 🎉</p>
              </div>
            `,
      };
      Date().toLocaleString("bn-BD");

      await transporter.sendMail(mailOptions);
      console.log(`✅ Success email sent to ${trx.email}`);
    } catch (mailErr) {
      console.error("❌ Email sending failed:", mailErr);
    }

    // --------------- Redirect user ----------------
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/ticket/movie/success?tranId=${tranId}`,
      { status: 303 }
    );
  } catch (err) {
    console.error("Payment success error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
