import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const tranId =
    "TH_" +
    Math.random().toString(36).substring(2, 14).toUpperCase() +
    "_" +
    Math.floor(100000 + Math.random() * 900000);

  try {
    const transactions = dbConnect("movie-transactions");

    // save transaction mapping
    await transactions.insertOne({
      tranId,
      movieId: body.movieId,
      seats: body.seats,
      email: body.customerEmail,
      amount: body.amount,
      currency: body.currency,
      status: "PENDING",
      tranAt: new Date().toISOString(),
      organizerEmail: body.organizerEmail,
    });

    const payload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASS,
      total_amount: Number(body.amount),
      currency: body.currency,
      tran_id: tranId,
      product_category: "movie_ticket",
      product_name: body.title,
      product_profile: "ticket_hub",
      cus_name: body.customerName,
      cus_email: body.customerEmail,
      cus_phone: body.customerPhone,
      cus_add1: body.location || "N/A",
      cus_city: body.customerCity || "N/A",
      cus_country: "Bangladesh",
      shipping_method: "NO",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/movie/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/unsuccess?ticket=movie`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/unsuccess?ticket=movie`,
    };

    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      }
    );

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Payment initiation error:", err);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
