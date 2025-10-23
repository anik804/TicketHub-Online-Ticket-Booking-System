"use client";

import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useMoviePayment } from "@/hooks/useMoviePayment";

export default function MoviePaymentHistory() {
  const { data: session } = useSession();
  const {
    paymentHistory = [],
    paymentLoading,
    paymentError,
  } = useMoviePayment({ user: session?.user?.email });

  return (
    <DashboardLayout role="User">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
      >
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
          Payment History (Paid)
        </h1>

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
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
                      {trx.tranId}
                    </td>
                    <td className="px-6 py-4">{trx.movieId}</td>
                    <td className="px-6 py-4 space-x-1">{trx.seats.map((seat) => <span className="px-2 py-1 bg-primary/20 border border-primary text-primary rounded-md">{seat}</span>) || "N/A"}</td>
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
    </DashboardLayout>
  );
}
