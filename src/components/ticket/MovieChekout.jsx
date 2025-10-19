"use client";

import Button from "@/ui/Button";
import { useState } from "react";

export default function MovieCheckout({ movieTicket }) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieTicket),
      });

      const text = await res.text();
      console.log("Raw Response:", text);

      const data = JSON.parse(text);

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        alert("Payment initiation failed!");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className={`min-w-32 ${loading ? "pointer-events-none" : ""}`}
      onClick={handlePayment}
      disabled={loading}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}
