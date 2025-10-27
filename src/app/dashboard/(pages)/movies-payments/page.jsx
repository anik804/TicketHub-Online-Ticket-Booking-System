"use client";

import React from "react";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useMoviePayment } from "@/hooks/useMoviePayment";
import DashboardSection from "../../components/shared/DashboardSection";

export default function MoviePaymentHistory() {
  const { data: session } = useSession();
  const {
    paymentHistory = [],
    paymentLoading,
    paymentError,
  } = useMoviePayment({ user: session?.user?.email });

  return (
    <DashboardSection title="Movies Payment History (Paid)" role="user">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
      >
        {paymentLoading ? (
          <div className="text-center py-10 text-white">
            Loading your payments...
          </div>
        ) : paymentError ? (
          <div className="text-center py-10 text-red-500">
            Failed to load payment history. Please try again.
          </div>
        ) : paymentHistory.length === 0 ? (
          <div className="text-center py-10 text-white">
            You have not made any event payments yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#142137] rounded-md shadow border border-primary/30 ">
            <table className="min-w-full text-sm text-white">
              <thead className="bg-black/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Movie ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Seats</th>
                  <th className="px-6 py-4 text-left font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Payment Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {paymentHistory.map((trx, index) => (
                  <tr
                    key={trx._id}
                    className={`${
                      index % 2 === 0
                        ? "bg-transparent "
                        : "bg-black/10 "
                    } hover:bg-black/20 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
                      {trx.tranId}
                    </td>
                    <td className="px-6 py-4">{trx.movieId}</td>
                    <td className="px-6 py-4 space-x-1">
                      {trx.seats.map((seat) => (
                        <span className="px-2 py-1 bg-primary/20 border border-primary text-primary rounded-md">
                          {seat}
                        </span>
                      )) || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-sky-700 dark:text-sky-400">
                      {trx.amount + " " + trx.currency}
                    </td>
                    <td className="px-6 py-4">
                      {trx.paidAt
                        ? new Date(trx.paidAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </DashboardSection>
  );
}
