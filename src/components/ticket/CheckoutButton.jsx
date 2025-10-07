"use client";

import Button from "@/ui/Button";
import { useState } from "react";

export default function CheckoutButton({ ticket, converting }) {
  const [loading, setLoading] = useState(false);

  async function handlePayment() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
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
      className={`min-w-32 ${loading && converting ? "pointer-events-none" : ""}`}
      onClick={handlePayment}
      disabled={loading || converting}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}
