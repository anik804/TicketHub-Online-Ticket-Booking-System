"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useEventPayment } from "@/hooks/useEventPayment";
import { useEventTicket } from "@/hooks/useEventTicket";
import { useMoviePayment } from "@/hooks/useMoviePayment";
import EventTicketDownload from "@/components/ticket/EventTicketDownload";
import Button from "@/ui/Button";
import DashboardSection from "../../components/shared/DashboardSection";

export default function MyTickets() {
  const { data: session } = useSession();

  // ✅ Fetch Event Payments
  const { paymentHistory, paymentLoading, paymentError } = useEventPayment({
    user: session?.user?.email,
  });

  // ✅ Fetch Movie Payments
  const {
    paymentHistory: moviePaymentHistory,
    paymentLoading: movieLoading,
    paymentError: movieError,
  } = useMoviePayment({
    user: session?.user?.email,
  });

  return (
    <DashboardSection title="Purchased Tickets" role="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen text-gray-200"
      >
        <div className="text-2xl font-semibold mb-4">Event Tickets</div>

        {/* ✅ Handle Loading / Error / Empty States */}
        {paymentLoading ? (
          <div className="flex justify-center items-center py-20 text-gray-400">
            Loading your tickets...
          </div>
        ) : paymentError ? (
          <div className="text-center py-20 text-red-400">
            Failed to load payment history. Please try again later.
          </div>
        ) : paymentHistory.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            You haven’t purchased any event tickets yet.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {paymentHistory.map((payment) => (
              <EventTicketCard key={payment._id} payment={payment} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </DashboardSection>
  );
}

/**
 * ================================
 * 🎫 Event Ticket Card Component
 * ================================
 */

const EventTicketCard = ({ payment }) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const tranId = payment?.tranId;
  const customerEmail = payment?.paidBy;

  // Fetch event ticket details
  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: payment.eventId,
    seatQuantity: payment.seatQuantity,
    currency: payment.currency,
    totalPrice: payment.amount,
  });

  useEffect(() => {
    if (eventTicket) setTicket(eventTicket);
  }, [eventTicket]);

  // Handle ticket cancellation
  const handleCancelTicket = async () => {
    if (!tranId || !customerEmail) {
      toast.error("Transaction info missing.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payment/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tranId, customerEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Example: if backend sends status 400 with { error: "panding" }
        const msg =
          data.error === "panding"
            ? "Your cancellation request is already pending approval."
            : data.error || "Failed to send cancellation request.";
        throw new Error(msg);
      }

      toast.success("✅ Ticket cancellation request submitted successfully!");
    } catch (err) {
      console.error("Ticket cancellation error:", err);
      toast.error(err.message || "Failed to cancel ticket. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col justify-between p-5 rounded-xl 
                 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
                 border border-orange-500/30 shadow-md 
                 hover:shadow-orange-500/20 transition-all duration-300"
    >
      {ticketLoading ? (
        <div className="flex justify-center items-center h-40 text-gray-400">
          Fetching ticket info...
        </div>
      ) : ticketError ? (
        <div className="text-center text-red-400 text-sm">
          Could not load ticket details.
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-orange-400 mb-1">
              {ticket?.title || "Event Ticket"}
            </h2>
            <p className="text-sm text-gray-400">
              {payment.currency} {payment.amount.toLocaleString()} •{" "}
              {payment.seatQuantity} seat
              {payment.seatQuantity > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <Button
              disabled={loading}
              label={loading ? "Sending..." : "Cancel Ticket"}
              onClick={handleCancelTicket}
              className="bg-red-600 hover:bg-red-700"
            />
            <EventTicketDownload
              paymentHistory={payment}
              eventTicket={ticket}
            />
          </div>
        </>
      )}
    </motion.div>
  );
};


