"use client";

import PageLayout from "@/ui/PageLayout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TicketVerify() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (!tranId) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/payment/verify?tran_id=${tranId}`);
        const data = await res.json();
        setPaymentStatus(data?.status || "NOT FOUND");
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("ERROR");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [tranId]);

  const renderMessage = () => {
    switch (paymentStatus) {
      case "PAID":
        return (
          <div className="flex flex-col items-center text-center border border-green-600 bg-green-50 px-8 py-6 rounded-xl shadow-sm animate-fade-in">
            <p className="text-green-700 text-3xl font-bold mb-2">
              ✅ Ticket Verified
            </p>
            <p className="text-gray-600 font-medium">
              Your transaction has been successfully verified.
            </p>
          </div>
        );

      case "NOT FOUND":
        return (
          <div className="flex flex-col items-center text-center border border-red-600 bg-red-50 px-8 py-6 rounded-xl shadow-sm animate-fade-in">
            <p className="text-red-700 text-3xl font-bold mb-2">
              ❌ Verification Failed
            </p>
            <p className="text-gray-600 font-medium">
              We couldn’t find this transaction. Please check your ticket ID.
            </p>
          </div>
        );

      case "ERROR":
        return (
          <div className="flex flex-col items-center text-center border border-yellow-600 bg-yellow-50 px-8 py-6 rounded-xl shadow-sm animate-fade-in">
            <p className="text-yellow-700 text-3xl font-bold mb-2">
              ⚠️ Something Went Wrong
            </p>
            <p className="text-gray-600 font-medium">
              There was an issue verifying your ticket. Try again later.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-gray-600 text-lg font-medium text-center animate-fade-in">
            Transaction not found.
          </div>
        );
    }
  };

  return (
    <PageLayout
      className="min-h-[50vh] py-10 flex items-center justify-center"
      title="Ticket Verification"
    >
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="loading loading-infinity loading-lg text-primary" />
          <p className="text-gray-500 text-sm animate-pulse">
            Verifying your ticket...
          </p>
        </div>
      ) : (
        renderMessage()
      )}
    </PageLayout>
  );
}
