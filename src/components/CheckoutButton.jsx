"use client";
import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: 1000,
        productName: "Laptop Bag",
        customerName: "Pranoy Biswas",
        customerEmail: "pranoy@example.com",
        customerPhone: "017XXXXXXXX",
        customerCity: "Dhaka",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data?.GatewayPageURL) {
      window.location.href = data.GatewayPageURL; // redirect
    } else {
      alert("Payment initiation failed!");
    }
    setLoading(false);
  }

  return (
    <button onClick={handlePayment} disabled={loading}>
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
