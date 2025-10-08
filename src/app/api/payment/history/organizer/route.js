import { NextResponse } from "next/server";
import { dbConnect } from "@/libs/dbConnect";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// GET Transactions History
export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const organizerEmail = session?.user.email;

    const paymentTransactions = dbConnect("ticket-payments");

    const transactions = await paymentTransactions
      .find({ organizerEmail })
      .toArray();

    if (transactions.length === 0) {
      return NextResponse.json(
        { status: "Transactions not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transactions, {
      status: 200,
    });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

