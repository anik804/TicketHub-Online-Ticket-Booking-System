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

  const fetchTransHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payment/history`);
      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load transaction:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransHistory();
  }, []);

  const handleDelete = async (tranId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to recover this transaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    setDeletingId(tranId);

    try {
      const res = await fetch(`/api/payment/history?tranId=${tranId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setTransactions((prev) => prev.filter((trx) => trx.tranId !== tranId));
        Swal.fire("Deleted!", "The transaction has been deleted.", "success");
      } else {
        Swal.fire(
          "Error!",
          data.error || "Failed to delete transaction.",
          "error"
        );
      }
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="User">
        <p className="text-center py-6">Loading Transactions...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="User">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 border-b">Transaction ID</th>
                  <th className="px-4 py-2 border-b">Event ID</th>
                  <th className="px-4 py-2 border-b">Seat</th>
                  <th className="px-4 py-2 border-b">Amount</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx) => (
                  <tr
                    key={trx.tranId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 border-b">{trx.tranId}</td>
                    <td className="px-4 py-2 border-b">{trx.eventId}</td>
                    <td className="px-4 py-2 border-b">{trx.seat}</td>
                    <td className="px-4 py-2 border-b">
                      {trx.amount} {trx.currency || "BDT"}
                    </td>
                    <td className="px-4 py-2 border-b">{trx.status}</td>
                    <td className="px-4 py-2 border-b">
                      {trx.tranAt
                        ? new Date(trx.tranAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-center flex gap-2 items-center">
                      <Link
                        href={`/ticket/details?seat=${trx.seat}&eventId=${trx.eventId}`}
                        className={`size-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-2xl text-white shadow-sm`}
                      >
                        <MdInfo />
                      </Link>

                      <button
                        className={`size-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 cursor-pointer text-2xl text-white shadow-sm ${
                          deletingId === trx.tranId
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => handleDelete(trx.tranId)}
                        disabled={deletingId === trx.tranId}
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
