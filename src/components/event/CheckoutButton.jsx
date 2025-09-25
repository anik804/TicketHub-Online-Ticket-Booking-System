"use client";
import Button from "@/ui/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CheckoutButton({seat}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  async function handlePayment() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: "68d4f6708ae49bb12b05b3f2",
          amount: 1000,
          seat: seat,
          productName: "Laptop Bag",
          customerName: session?.user?.name || "Pranoy Biswas",
          customerEmail: session?.user?.email || "pranoy@example.com",
          customerPhone: session?.user?.phone || "017XXXXXXXX",
          customerCity: "Dhaka",
        }),
      });

      // Network response log
      console.log("Status:", res.status);
      const text = await res.text(); // json() fail হলে text() দিয়ে check
      console.log("Response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON parse error:", e);
      }

      if (data?.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        alert("Payment initiation failed!");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Payment initiation error!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="w-20 md:w-26 lg:w-32"
      onClick={handlePayment}
      disabled={loading}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}
