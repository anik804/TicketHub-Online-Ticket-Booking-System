"use client";
import CheckoutButton from "@/components/CheckoutButton";
import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    const tran_id = "ORD_" + Date.now(); // unique order id

    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 500,
        tran_id,
        cus_name: "Pranoy",
        cus_email: "you@example.com",
        cus_phone: "01700000000",
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment initiation failed!");
      console.error(data);
    }
  }

  return (
    <CheckoutButton/>
  );
}
