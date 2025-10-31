"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useEventTicket } from "@/hooks/useEventTicket";
import { motion } from "framer-motion";
import EventTicketDownload from "@/components/ticket/EventTicketDownload";
import Button from "@/ui/Button";
import DashboardSection from "../../components/shared/DashboardSection";
import { useMoviePayment } from "@/hooks/useMoviePayment";

export default function MyTickets() {
  const { data: session } = useSession();
  const { paymentHistory, paymentLoading, paymentError } = useEventPayment({
    user: session?.user?.email,
  });
  const {
    paymentHistory: moviePaymentHistory,
    paymentLoading: movieLoading,
    paymentError: movieError,
  } = useMoviePayment({
    user: session?.user?.email,
  });

  console.log("eventPaymentHistory", paymentHistory);
  console.log("moviePaymentHistory", moviePaymentHistory);

  return (
    <DashboardSection title="Purchased Tickets" role="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen text-gray-200"
      >
        <div className="text-2xl font-semibold mb-4">Event Tickets</div>
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

const EventTicketCard = ({ payment }) => {
  const [ticket, setTicket] = useState(null);
  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: payment.eventId,
    seatQuantity: payment.seatQuantity,
    currency: payment.currency,
    totalPrice: payment.amount,
  });

  useEffect(() => {
    if (eventTicket) setTicket(eventTicket);
  }, [eventTicket]);

  const handleCancelTicket = () => {
    console.log("Cancel ticket:", payment._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="relative flex flex-col justify-between p-5 rounded-xl 
                 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
                 border border-orange-500/30 shadow-sm hover:shadow-orange-500/20 
                 transition-all duration-300"
    >
      {ticketLoading ? (
        <div className="flex justify-center items-center h-40 text-gray-400">
          Fetching ticket info...
        </div>
      ) : ticketError ? (
        <div className="text-center text-red-400 text-sm">
          Failed to load ticket details.
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-orange-400 mb-1">
              {ticket?.title || "Event Ticket"}
            </h2>
            <p className="text-sm text-gray-400">
              {payment.currency} {payment.amount} | {payment.seatQuantity} seat
              {payment.seatQuantity > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <Button label="Cancel Ticket" onClick={handleCancelTicket} />
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

const MyMovieTicketCard = ({ payment }) => {
  const [ticket, setTicket] = useState(null);
  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: payment.eventId,
    seatQuantity: payment.seatQuantity,
    currency: payment.currency,
    totalPrice: payment.amount,
  });

  useEffect(() => {
    if (eventTicket) setTicket(eventTicket);
  }, [eventTicket]);

  const handleCancelTicket = () => {
    console.log("Cancel ticket:", payment._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className="relative flex flex-col justify-between p-5 rounded-xl 
                 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
                 border border-orange-500/30 shadow-sm hover:shadow-orange-500/20 
                 transition-all duration-300"
    >
      {ticketLoading ? (
        <div className="flex justify-center items-center h-40 text-gray-400">
          Fetching ticket info...
        </div>
      ) : ticketError ? (
        <div className="text-center text-red-400 text-sm">
          Failed to load ticket details.
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold text-orange-400 mb-1">
              {ticket?.title || "Event Ticket"}
            </h2>
            <p className="text-sm text-gray-400">
              {payment.currency} {payment.amount} | {payment.seatQuantity} seat
              {payment.seatQuantity > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <Button label="Cancel Ticket" onClick={handleCancelTicket} />
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
