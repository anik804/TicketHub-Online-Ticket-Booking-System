import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url, req.nextUrl.origin);

  const tran_id = searchParams.get("tran_id");

  console.log("✅ Payment Success TranID:", tran_id);

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?tran_id=${tran_id}`);
}
