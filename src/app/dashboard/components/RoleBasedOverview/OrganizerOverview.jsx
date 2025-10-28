"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardSection from "../shared/DashboardSection";

export default function OrganizerOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalEvents: 12,
    pendingEvents: 2,
    totalProfit: 18750,
  });

  const eventTrend = [
    { month: "Jan", events: 3 },
    { month: "Feb", events: 2 },
    { month: "Mar", events: 4 },
    { month: "Apr", events: 5 },
    { month: "May", events: 7 },
    { month: "Jun", events: 6 },
    { month: "Jul", events: 8 },
    { month: "Aug", events: 4 },
    { month: "Sep", events: 9 },
    { month: "Oct", events: 10 },
  ];

  const revenueBreakdown = [
    { name: "Concerts", value: 45 },
    { name: "Workshops", value: 30 },
    { name: "Movies", value: 15 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"]; // orange theme

  useEffect(() => {
    if (!session) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `/api/organizer/stats?email=${session.user.email}`
        );
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [session]);

  return (
    <DashboardSection title="Organizer Dashboard" role="organizer">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-10 w-full"
      >
        {/* Organizer Info */}
        <div className="mb-10 p-6 bg-white rounded-2xl shadow-lg border border-orange-100">
          <h2 className="text-3xl font-semibold mb-3 text-gray-800">
            Welcome, {session?.user.name || "Organizer"} 🎤
          </h2>
          <p className="text-gray-600">Email: {session?.user.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            color="bg-orange-500"
          />
          <StatCard
            title="Pending Events"
            value={stats.pendingEvents}
            color="bg-orange-400"
          />
          <StatCard
            title="Total Profit"
            value={`$${stats.totalProfit.toLocaleString()}`}
            color="bg-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Line Chart - Event Growth */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Event Growth Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventTrend}>
                <XAxis dataKey="month" stroke="#888" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart - Revenue Breakdown */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
            whileHover={{ scale: 1.01 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Revenue Breakdown by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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

// Stat Card component
function StatCard({ title, value, color }) {
  return (
    <motion.div
      className="p-6 rounded-2xl shadow-md border border-orange-100 bg-white flex flex-col items-start justify-between hover:shadow-xl transition"
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <h2 className={`text-3xl font-bold text-gray-800`}>{value}</h2>
      <div className={`mt-3 h-1 w-full rounded-full ${color}`}></div>
    </motion.div>
  );
}
