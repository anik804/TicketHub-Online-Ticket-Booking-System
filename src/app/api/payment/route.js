import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const tran_id = "txn_" + Date.now(); // Unique transaction id

  const payload = {
    store_id: process.env.SSLC_STORE_ID,
    store_passwd: process.env.SSLC_STORE_PASS,
    total_amount: Number(body.amount),
    currency: "BDT",
    tran_id,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success?tran_id=${tran_id}`,
    fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail?tran_id=${tran_id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel?tran_id=${tran_id}`,
    product_category: "ecommerce",
    product_name: body.productName,
    product_profile: "event",

    cus_name: body.customerName,
    cus_email: body.customerEmail,
    cus_phone: body.customerPhone,
    cus_add1: "Dhaka",
    cus_city: body.customerCity || "Dhaka",
    cus_country: "Bangladesh",
    shipping_method: "NO",
  };

  try {
    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      }
    );

    const result = await response.json();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
