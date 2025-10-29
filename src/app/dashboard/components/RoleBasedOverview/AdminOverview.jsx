"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrganizers: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (res.ok) setStats(data);
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Organizers", value: stats.totalOrganizers },
    { name: "Events", value: stats.totalEvents },
  ];

  const COLORS = ["#d96c2c", "#950101", "#FFD93D"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <motion.div variants={cardVariants} className="mb-8">
        <h2 className="text-3xl font-bold text-accent lg:text-4xl">
          📊 Admin Dashboard Overview
        </h2>
        <p className="mt-2 text-sm text-base-content/70">
          Monitor your platform's performance and key metrics
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {/* Total Users Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
                  Total Users
                </p>
                <h3 className="mt-2 text-4xl font-bold text-primary">
                  {stats.totalUsers}
                </h3>
                <p className="mt-2 text-xs text-base-content/50">
                  Registered members
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
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
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-base-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="mt-1 text-xs text-base-content/50">
                75% of target reached
              </p>
            </div>
          </div>
        </motion.div>

        {/* Total Organizers Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          className="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
                  Total Organizers
                </p>
                <h3 className="mt-2 text-4xl font-bold text-secondary">
                  {stats.totalOrganizers}
                </h3>
                <p className="mt-2 text-xs text-base-content/50">
                  Active organizers
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-base-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-secondary"
                />
              </div>
              <p className="mt-1 text-xs text-base-content/50">
                60% growth this month
              </p>
            </div>
          </div>
        </motion.div>

        {/* Total Events Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.03, y: -5 }}
          className="card bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl transition-all duration-300 hover:shadow-2xl"
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-base-content/60">
                  Total Events
                </p>
                <h3 className="mt-2 text-4xl font-bold text-accent">
                  {stats.totalEvents}
                </h3>
                <p className="mt-2 text-xs text-base-content/50">
                  Events created
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-base-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-accent"
                />
              </div>
              <p className="mt-1 text-xs text-base-content/50">
                85% capacity utilized
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        {/* Bar Chart */}
        <motion.div
          variants={cardVariants}
          className="card bg-base-100 shadow-2xl"
        >
          <div className="card-body">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-accent">
                  Performance Overview
                </h3>
                <p className="text-sm text-base-content/60">
                  User & event statistics
                </p>
              </div>
              <div className="badge badge-primary gap-2 px-4 py-3">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Bar Chart
              </div>
            </div>
            <div className="divider mt-0"></div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "currentColor" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  tick={{ fill: "currentColor" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--b1))",
                    border: "1px solid hsl(var(--b3))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={cardVariants}
          className="card bg-base-100 shadow-2xl"
        >
          <div className="card-body">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-accent">
                  Data Distribution
                </h3>
                <p className="text-sm text-base-content/60">
                  Breakdown by category
                </p>
              </div>
              <div className="badge badge-secondary gap-2 px-4 py-3">
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
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
                Pie Chart
              </div>
            </div>
            <div className="divider mt-0"></div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--b1))",
                    border: "1px solid hsl(var(--b3))",
                    borderRadius: "0.5rem",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats Footer */}
      <motion.div
        variants={cardVariants}
        className="mt-8 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {((stats.totalOrganizers / stats.totalUsers) * 100 || 0).toFixed(
                1
              )}
              %
            </div>
            <div className="text-sm text-base-content/60">
              Organizer Conversion Rate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">
              {(stats.totalEvents / stats.totalOrganizers || 0).toFixed(1)}
            </div>
            <div className="text-sm text-base-content/60">
              Avg Events per Organizer
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {stats.totalUsers + stats.totalOrganizers + stats.totalEvents}
            </div>
            <div className="text-sm text-base-content/60">
              Total Platform Activity
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
