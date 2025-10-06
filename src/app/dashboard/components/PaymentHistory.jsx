"use client";

import { useEffect, useState } from "react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch("/api/organizer/payment-transactions")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-6 text-gray-500">Loading payments...</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">💳 Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>User Email</th>
                <th>Seat</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.email}</td>
                  <td>{payment.seat}</td>
                  <td className="font-mono text-sm text-gray-700">
                    {payment.tranId}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        payment.status === "PAID"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    {new Date(payment.paidAt).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
