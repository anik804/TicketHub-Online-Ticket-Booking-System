"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./shared/Loader";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useSession } from "next-auth/react";

export default function PaymentHistory() {
  const { data: session, status } = useSession();
  const organizerEmail = status === "authenticated" && session?.user?.email;

  const { paymentHistory = [], paymentLoading } = useEventPayment({
    organizer: organizerEmail,
  });

  // Calculate total earnings
  const totalEarnings = paymentHistory.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const paidCount = paymentHistory.filter((p) => p.status === "PAID").length;

  if (paymentLoading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-accent lg:text-4xl">
          Payment History
        </h2>
        <p className="mt-2 text-sm text-base-content/70">
          Track all payment transactions for your events
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* Total Transactions */}
        <div className="stats bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Total Transactions</div>
            <div className="stat-value text-primary">
              {paymentHistory.length}
            </div>
            <div className="stat-desc">All payment records</div>
          </div>
        </div>

        {/* Successful Payments */}
        <div className="stats bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Successful Payments</div>
            <div className="stat-value text-secondary">{paidCount}</div>
            <div className="stat-desc">Completed transactions</div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="stats bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Total Earnings</div>
            <div className="stat-value text-accent">
              {totalEarnings.toLocaleString()}
            </div>
            <div className="stat-desc">
              {paymentHistory[0]?.currency || "BDT"}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-base-100 shadow-2xl"
      >
        <div className="card-body p-0">
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="table w-full">
              <thead>
                <tr className="border-b-2 border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <th className="text-center text-base font-bold">No.</th>
                  <th className="text-base font-bold">User Email</th>
                  <th className="text-center text-base font-bold">Seats</th>
                  <th className="text-base font-bold">Transaction ID</th>
                  <th className="text-center text-base font-bold">Amount</th>
                  <th className="text-center text-base font-bold">Status</th>
                  <th className="text-center text-base font-bold">Paid At</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment, index) => (
                  <motion.tr
                    key={payment._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-base-200 transition-all duration-200 hover:bg-base-200/50"
                  >
                    <td className="text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {index + 1}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-base-content/40"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="font-medium text-accent">{payment.paidBy}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="badge badge-ghost gap-2 px-3 py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {payment.seatQuantity}
                      </div>
                    </td>
                    <td>
                      <code className="rounded bg-base-200 px-2 py-1 text-xs text-gray-500 font-mono">
                        {payment.tranId}
                      </code>
                    </td>
                    <td className="text-center">
                      <span className="font-bold text-primary">
                        {payment.amount} {payment.currency}
                      </span>
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge gap-2 px-3 py-3 font-semibold ${
                          payment.status === "PAID"
                            ? "badge-success"
                            : payment.status === "PENDING"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {payment.status === "PAID" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td className="text-center text-sm text-gray-500">
                      {new Date(payment.paidAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="space-y-4 p-4 lg:hidden">
            {paymentHistory.map((payment, index) => (
              <motion.div
                key={payment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card bg-base-200 shadow-md"
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-xs text-black">
                          Transaction
                        </p>
                        <span className="text-xs text-gray-500">{payment.tranId}</span>
                      </div>
                    </div>
                    <span
                      className={`badge badge-sm ${
                        payment.status === "PAID"
                          ? "badge-success"
                          : payment.status === "PENDING"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/60">
                        User:
                      </span>
                      <span className="text-sm font-medium">
                        {payment.paidBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/60">
                        Seats:
                      </span>
                      <span className="badge badge-ghost">
                        {payment.seatQuantity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/60">
                        Amount:
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {payment.amount} {payment.currency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/60">
                        Date:
                      </span>
                      <span className="text-xs">
                        {new Date(payment.paidAt).toLocaleString("en-BD", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {paymentHistory.length === 0 && (
            <div className="py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-base-content/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="mt-4 text-lg font-semibold text-base-content/50">
                No payments found
              </p>
              <p className="text-sm text-base-content/30">
                Payments will appear here once users register for your events
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Summary Footer */}
      {paymentHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-4"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-base-content/70">
              Showing all {paymentHistory.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">Total Earnings:</span>
              <span className="text-lg font-bold text-primary">
                {totalEarnings.toLocaleString()}{" "}
                {paymentHistory[0]?.currency || "BDT"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
