"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

export default function page() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchTransHistory = async () => {
      try {
        const res = await fetch(`/api/payment/history`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.log("Failed to load transaction:", err);
        setTransactions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTransHistory();
  }, []);

  console.log(transactions);
  return <DashboardLayout role="User"></DashboardLayout>;
}
