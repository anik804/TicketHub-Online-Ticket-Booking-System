"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardSection from "../shared/DashboardSection";
import { useEventPayment } from "@/hooks/useEventPayment";
import { useEventData } from "@/hooks/useEventData";

export default function UserOverview() {
  const { data: session } = useSession();
  const { paymentHistory, paymentLoading, paymentError } = useEventPayment({
    user: session?.user?.email,
  });

  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalSpent: {},
  });

  // Helper: Fetch event data for each payment
  const [eventMap, setEventMap] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!paymentHistory?.length) return;
      const results = {};

      for (const payment of paymentHistory) {
        try {
          const res = await fetch(`/api/events/${payment.eventId}`);
          const data = await res.json();
          if (res.ok) results[payment.eventId] = data;
        } catch (err) {
          console.error("Event fetch error:", err);
        }
      }
      setEventMap(results);
    };

    fetchEventDetails();
  }, [paymentHistory]);

  // Compute stats once event data is ready
  useEffect(() => {
    if (!paymentHistory?.length) return;

    const now = new Date();
    let upcoming = 0;
    let past = 0;
    const currencyTotals = {};

    paymentHistory.forEach((payment) => {
      const event = eventMap[payment.eventId];
      if (!event?.date) return;

      const eventDate = new Date(event.date);

      if (eventDate > now) upcoming++;
      else past++;

      // Sum by currency
      const currency = payment.currency || "UNKNOWN";
      const amount = Number(payment.amount) || 0;
      currencyTotals[currency] = (currencyTotals[currency] || 0) + amount;
    });

    setStats({
      totalBookings: paymentHistory.length,
      upcomingEvents: upcoming,
      pastEvents: past,
      totalSpent: currencyTotals,
    });
  }, [paymentHistory, eventMap]);

  // Dummy data for chart (you can replace later with live analytics)
  const bookingsData = useMemo(
    () => [
      { month: "Jan", bookings: 5 },
      { month: "Feb", bookings: 8 },
      { month: "Mar", bookings: 12 },
      { month: "Apr", bookings: 10 },
      { month: "May", bookings: 15 },
      { month: "Jun", bookings: 9 },
      { month: "Jul", bookings: 14 },
      { month: "Aug", bookings: 18 },
      { month: "Sep", bookings: 13 },
      { month: "Oct", bookings: 16 },
    ],
    []
  );

  const categoryData = [
    { name: "Movies", value: 45 },
    { name: "Events", value: 30 },
    { name: "Concerts", value: 15 },
    { name: "Sports", value: 10 },
  ];
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <DashboardSection role="user" title="User Dashboard">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-10 p-6 bg-[#142137] rounded-md shadow-md border border-primary/30">
          <h2 className="text-3xl font-semibold mb-3">
            Welcome Back, {session?.user.name?.split(" ")[0] || "User"} 👋
          </h2>
          <p className="text-gray-400">Email: {session?.user.email}</p>
        </div>

        {/* Stats Section */}
        {paymentLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Bookings" value={stats.totalBookings} />
            <StatCard title="Upcoming Events" value={stats.upcomingEvents} />
            <StatCard title="Past Events" value={stats.pastEvents} />

            {/* Total spent per currency */}
            <motion.div
              className="p-6 bg-[#142137] rounded-md shadow-md border border-primary/30"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-primary text-sm uppercase tracking-wide mb-3">
                Total Spent
              </h3>
              {Object.entries(stats.totalSpent).map(([currency, amount]) => (
                <p key={currency} className="text-lg font-semibold text-white">
                  {currency}: {amount.toFixed(2)}
                </p>
              ))}
              {!Object.keys(stats.totalSpent).length && (
                <p className="text-gray-500 text-sm">No payments yet</p>
              )}
            </motion.div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Line Chart */}
          <motion.div
            className="p-6 bg-[#142137] rounded-md shadow-md border border-primary/30"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4 text-primary">
              Monthly Bookings Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingsData}>
                <XAxis dataKey="month" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            className="p-6 bg-[#142137] rounded-md shadow-md border border-primary/30"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4 text-primary">
              Bookings by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </DashboardSection>
  );
}

// Reusable Stat Card
function StatCard({ title, value }) {
  return (
    <motion.div
      className="p-6 bg-[#142137] rounded-md shadow-md border border-primary/30 transition"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-primary text-sm uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
