
import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { tranId, eventId, seats, ticketPrice, customerName, customerEmail, customerPhone, eventTitle } = body;

  try {
    const paymentTransactions = dbConnect("payment-transactions");

    // save as array of seats
    await paymentTransactions.insertOne({
      tranId,
      eventId,
      seats: Array.isArray(seats) ? seats : [seats],
      email: customerEmail,
      amount: ticketPrice * (Array.isArray(seats) ? seats.length : 1),
      status: "PENDING",
      tranAt: new Date().toISOString(),
    });

    const payload = {
      store_id: process.env.SSLC_STORE_ID,
      store_passwd: process.env.SSLC_STORE_PASS,
      total_amount: ticketPrice * seats.length,
      currency: "BDT",
      tran_id: tranId,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-booking/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-booking/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/group-booking/cancel`,
      product_category: "ticket",
      product_name: eventTitle,
      product_profile: "ticket_hub",
      cus_name: customerName,
      cus_email: customerEmail,
      cus_phone: customerPhone,
      cus_add1: "Not Set",
      cus_city: "Not Set",
      cus_country: "Bangladesh",
      shipping_method: "NO",
    };

    const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("Group booking initiation error:", err);
    return NextResponse.json({ error: "Group booking initiation failed" }, { status: 500 });
  }
}
