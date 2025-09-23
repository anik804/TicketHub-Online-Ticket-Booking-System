import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.formData();
  const tran_id = data.get("tran_id");

  console.log("🚫 Payment Cancelled:", Object.fromEntries(data));

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel?tran_id=${tran_id}`
  );
}
