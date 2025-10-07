import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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
    const paymentTransactions = dbConnect("payment-transactions");

    // save transaction mapping
    await paymentTransactions.insertOne({
      tranId,
      eventId: body.eventId,
      seat: body.seat,
      email: body.customerEmail,
      amount: body.price,
      currency: body.currency,
      status: "PENDING",
      tranAt: new Date().toISOString(),
    });

    const payload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASS,
      total_amount: Number(body.price),
      currency: body.currency,
      tran_id: tranId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`,
      product_category: "ticket",
      product_name: body.title,
      product_profile: "ticket_hub",
      cus_name: body.customerName,
      cus_email: body.customerEmail,
      cus_phone: body.customerPhone,
      cus_add1: body.location || "Not Set",
      cus_city: body.customerCity || "Not Set",
      cus_country: "Bangladesh",
      shipping_method: "NO",
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
