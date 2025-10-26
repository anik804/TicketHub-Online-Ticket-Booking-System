"use client";

import React from "react";

import { motion } from "framer-motion";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useSession } from "next-auth/react";
import DashboardSection from "../../components/shared/DashboardSection";

export default function EventPaymentHistory() {
  const { data: session } = useSession();
  const {
    paymentHistory = [],
    paymentLoading,
    paymentError,
  } = useEventPayment({ user: session?.user?.email });

  return (
    <DashboardSection title="Events Payment History (Paid)" role="user"  >
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
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Event ID
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
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
                      {trx.tranId}
                    </td>
                    <td className="px-6 py-4">{trx.eventId}</td>
                    <td className="px-6 py-4">{trx.seatQuantity || "N/A"}</td>
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
