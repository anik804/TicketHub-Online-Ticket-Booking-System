import { NextResponse } from "next/server";

export async function POST(req) {
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/ticket-payment/fail`,
    { status: 303 }
  );
}
