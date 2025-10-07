"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GroupBookingForm({ event }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (selectedSeats.length === 0) return toast.error("Please select seats");

    setLoading(true);
    const tranId = "TID" + Date.now();

    try {
      const res = await fetch("/api/group-booking/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tranId,
          eventId: event._id,
          seats: selectedSeats,
          ticketPrice: event.price,
          customerName: "John Doe",
          customerEmail: "john@example.com",
          customerPhone: "01700000000",
          eventTitle: event.title,
        }),
      });

      const data = await res.json();
      if (data.GatewayPageURL) {
        // redirect user to SSLCommerz gateway page
        window.location.href = data.GatewayPageURL;
      } else {
        toast.error("Payment initialization failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Group Booking</h2>

      {/* example seat selection */}
      <div className="flex gap-2 mb-4">
        {["A1", "A2", "A3", "A4", "A5"].map((seat) => (
          <button
            key={seat}
            onClick={() =>
              setSelectedSeats((prev) =>
                prev.includes(seat)
                  ? prev.filter((s) => s !== seat)
                  : [...prev, seat]
              )
            }
            className={`px-3 py-1 border rounded ${
              selectedSeats.includes(seat)
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
