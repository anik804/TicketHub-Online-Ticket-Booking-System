"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { MdDelete, MdInfo } from "react-icons/md";
import Swal from "sweetalert2";
import Link from "next/link";

export default function TransactionsHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch transaction history
  const fetchTransHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/payment/history/user`);
      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Transaction fetch error:", err);
      Swal.fire(
        "Error",
        "Unable to load transactions. Try again later.",
        "error"
      );
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransHistory();
  }, []);

  console.log(transactions);

  // Delete a transaction
  const handleDelete = async (tranId) => {
    const confirm = await Swal.fire({
      title: "Delete Transaction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: "#fff",
    });

    if (!confirm.isConfirmed) return;

    setDeletingId(tranId);
    try {
      const res = await fetch(`/api/payment/history/user?tranId=${tranId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire(
          "Error",
          data.error || "Failed to delete transaction.",
          "error"
        );
        return;
      }

      setTransactions((prev) => prev.filter((trx) => trx.tranId !== tranId));
      Swal.fire("Deleted!", "Transaction removed successfully.", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Something went wrong while deleting.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout role="User">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
          Transaction History
        </h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-sm text-gray-800 dark:text-gray-100">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Transaction ID</th>
                  <th className="px-4 py-3 text-left">Seat</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Payment</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((trx, index) => (
                  <tr
                    key={trx.tranId}
                    className={`${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
                  >
                    <td className="px-4 py-3 font-medium">{trx.tranId}</td>
                    <td className="px-4 py-3">{trx.seat || "N/A"}</td>
                    <td className="px-4 py-3 text-sky-700">
                      {trx.amount} {trx.currency || "BDT"}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        trx.status === "SUCCESS"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {trx.status}
                    </td>
                    <td className="px-4 py-3">
                      {trx.tranAt
                        ? new Date(trx.tranAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      <Link
                        href={`/ticket/details?seat=${trx.seat}&eventId=${trx.eventId}`}
                        className="size-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xl shadow transition-transform hover:scale-110"
                      >
                        <MdInfo />
                      </Link>

                      <button
                        onClick={() => handleDelete(trx.tranId)}
                        disabled={deletingId === trx.tranId}
                        className={`size-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white text-xl shadow transition-transform hover:scale-110 ${
                          deletingId === trx.tranId
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <MdDelete />
                      </button>
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
