"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold text-green-700">🎉 Payment Successful!</h1>
      <p className="mt-2">Transaction ID: {tranId}</p>
    </div>
  );
}
