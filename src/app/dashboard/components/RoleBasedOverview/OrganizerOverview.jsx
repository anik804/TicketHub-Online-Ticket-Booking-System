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

  const COLORS = ["#f97316", "#fb923c", "#fdba74", "#ffedd5"]; // orange palette

  useEffect(() => {
    if (!session) return;
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/organizer/stats?email=${session.user.email}`);
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
        transition={{ duration: 0.6 }}
        className="pt-10 w-full text-white min-h-screen"
      >
        {/* Organizer Info */}
        <div className="mb-10 p-6 bg-[#1e1e1e] rounded-2xl shadow-lg border border-orange-600/20">
          <h2 className="text-3xl font-semibold mb-2 text-orange-400">
            Welcome, {session?.user.name || "Organizer"} 🎤
          </h2>
          <p className="text-gray-400 text-sm">Email: {session?.user.email}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            color="bg-orange-500"
            icon="📅"
          />
          <StatCard
            title="Pending Events"
            value={stats.pendingEvents}
            color="bg-orange-400"
            icon="⏳"
          />
          <StatCard
            title="Total Profit"
            value={`$${stats.totalProfit.toLocaleString()}`}
            color="bg-orange-600"
            icon="💰"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Line Chart */}
          <motion.div
            className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg border border-orange-600/20 hover:border-orange-500/40 transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4 text-orange-400">
              Event Growth Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={eventTrend}>
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #f97316",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#f97316" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg border border-orange-600/20 hover:border-orange-500/40 transition"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-bold mb-4 text-orange-400">
              Revenue Breakdown by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #f97316",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </DashboardSection>
  );
}

// Reusable StatCard Component
function StatCard({ title, value, color, icon }) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-[#1e1e1e] border border-orange-600/20 hover:border-orange-500/40 shadow-md flex flex-col items-start justify-between transition"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-xl">{icon}</span>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
      </div>
      <h2 className="text-3xl font-bold text-white">{value}</h2>
      <div className={`mt-3 h-1 w-full rounded-full ${color}`}></div>
    </motion.div>
  );
}
