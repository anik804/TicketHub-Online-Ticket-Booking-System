"use client";
import Button from "@/ui/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";

//dummy data
export const event = {
  _id: "68df6fbcc712eb0ef7a6a98e",
  title: "Cricket Match",
  date: "2025-09-26T16:08:41.672Z",
  location: "Andorkilla, Chittagong",
  price: 120,
  desc: "Pakistan vs Bangladesh T20I Final Match",
  category: "sports",
  imageUrl: "https://i.ibb.co.com/5hzLny6Y/ai-rising.webp",
  totalSeats: 200,
  availableSeats: 200,
  discount: 0,
  organizerEmail: "pranoy@gmail.com",
  lat: 22.3554568,
  lng: 91.8397677,
  createdAt: "2025-09-24T16:08:41.672Z",
};

export default function CheckoutButton({ seat }) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const tranId = `TICKETHUB_${Date.now()}_${Math.floor(
    Math.random() * 100000
  )}`;

  const tranData = {
    tranId,
    eventId: event._id,
    seat,
    amount: event.price,
    eventTitle: event.title,
    customerName: session?.user?.name || "pranay",
    customerEmail: session?.user?.email || "pranay@gmail.com",
    customerPhone: session?.user?.phone || "0125114455",
    customerCity: "Dhaka",
  };

  async function handlePayment() {
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tranData),
      });

      // Network response log
      const text = await res.text();
      console.log("Raw Response:", text);

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
      className="min-w-20 md:min-w-26 lg:min-w-32"
      onClick={handlePayment}
      disabled={loading}
      label={loading ? "Processing..." : "Pay Now"}
    />
  );
}
