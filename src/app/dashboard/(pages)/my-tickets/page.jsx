"use client";
import React, { use, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useEventTicket } from "@/hooks/useEventTicket";
import { motion } from "framer-motion";
import EventTicketDownload from "@/components/ticket/EventTicketDownload";
import Button from "@/ui/Button";
import DashboardSection from "../../components/shared/DashboardSection";

export default function MyTickets() {
  const { data: session } = useSession();
  const { paymentHistory, paymentLoading, paymentError } = useEventPayment({
    user: session?.user?.email,
  });

  return (
    <DashboardSection title="Purchased Ticket" role="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
      >
        {paymentLoading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Loading your payments...
          </div>
        ) : paymentError ? (
          <div className="text-center py-10 text-red-500">
            Failed to load payment history. Please try again.
          </div>
        ) : paymentHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            You have not made any event payments yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {paymentHistory.map((payment) => (
              <MyTicketCard key={payment._id} payment={payment} />
            ))}
          </div>
        )}
      </motion.div>
    </DashboardSection>
  );
}

export const MyTicketCard = ({ payment }) => {
  const [ticket, setTicket] = useState(null);

  const { eventTicket, ticketLoading, ticketError } = useEventTicket({
    eventId: payment.eventId,
    seatQuantity: payment.seatQuantity,
    currency: payment.currency,
    totalPrice: payment.amount,
  });

  useEffect(() => {
    if (eventTicket) {
      setTicket(eventTicket);
    }
  }, [eventTicket]);

  const handleCancelTicket = () => {};
  return (
    <div className="flex flex-col gap-2 w-full h-40 p-4 bg-base-300 rounded-md shadow-sm border border-primary/30">
      {ticket ? (
        <div>Hello</div>
      ) :
      
      (
        <>
          <h1>{ticket?.title}</h1>

          <Button onClick={handleCancelTicket} label="Cancel Ticket" />
          <EventTicketDownload paymentHistory={payment} eventTicket={ticket} />
        </>
      )}
    </div>
  );
};
