"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payment/history`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.log("Failed to load transaction:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransHistory();
  }, []);

  const handleDelete = async (tranId) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      const res = await fetch(`/api/payment/history?tranId=${tranId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        // remove deleted transaction from state
        setTransactions(transactions.filter((trx) => trx.tranId !== tranId));
      } else {
        alert(data.error || "Failed to delete transaction");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong while deleting");
    }
  };

  if (loading)
    return (
      <DashboardLayout role="User">
        <p className="text-center py-6">Loading Transactions...</p>
      </DashboardLayout>
    );

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
                  <th className="px-4 py-2 border-b">Amount (BDT)</th>
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
                    <td className="px-4 py-2 border-b">{trx.amount}</td>
                    <td className="px-4 py-2 border-b">{trx.status}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(trx.tranAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="btn btn-md btn-circle btn-error"
                        onClick={() => handleDelete(trx.tranId)}
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
