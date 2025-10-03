"use client";
import PageLayout from "@/ui/PageLayout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TicketVerify() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tranId");
  const [isLoading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/payment/verify?tran_id=${tranId}`);
        const data = await res.json();
        setPaymentStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  console.log(paymentStatus);
  return (
    <PageLayout>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="loading loading-infinity loading-lg"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-semibold text-gray-700 capitalize">
            {"Payment Status: " +  paymentStatus}
          </h1>
        </div>
      )}
    </PageLayout>
  );
}
