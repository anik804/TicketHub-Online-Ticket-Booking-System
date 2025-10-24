"use client";

import { useEffect, useState } from "react";
import Loader from "./shared/Loader";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const organizerEmail =
      localStorage.getItem("organizerEmail") || "organizer@example.com";

    fetch(`/api/organizer/payment-transactions?organizerEmail=${organizerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Payments response:", data);
        setPayments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>

      {Array.isArray(payments) && payments.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>No.</th>
                <th>User Email</th>
                <th>Seats</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.paidBy}</td>
                  <td>{payment.seatQuantity}</td>
                  <td className="font-mono text-sm text-gray-700">
                    {payment.tranId}
                  </td>
                  <td>{payment.amount} {payment.currency}</td>
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
      ) : (
        <p className="text-gray-500 text-center py-10">
          No payments found for your events yet.
        </p>
      )}
    </section>
  );
}
