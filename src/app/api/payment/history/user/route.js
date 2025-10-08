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
    const email = session?.user.email;

    const paymentTransactions = dbConnect("payment-transactions");

    const transactions = await paymentTransactions.find({ email }).toArray();

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

// DELETE Transaction
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const tranId = searchParams.get("tranId");

    if (!tranId) {
      return NextResponse.json(
        { error: "Transaction ID required" },
        { status: 400 }
      );
    }

    const paymentTransactions = dbConnect("payment-transactions");
    const payment = await paymentTransactions.findOne({ tranId });

    if (!payment) {
      return NextResponse.json({ status: "NOT FOUND" }, { status: 404 });
    }

    await paymentTransactions.deleteOne({ tranId });

    return NextResponse.json(payment, { status: 200 });
  } catch (err) {
    console.error("Fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch payment" },
      { status: 500 }
    );
  }
}
