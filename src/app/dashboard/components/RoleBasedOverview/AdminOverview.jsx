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

  const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-[#3D0000]">
        Admin Dashboard Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2 text-[#950101]">Total Users</h3>
          <p className="text-3xl font-semibold text-gray-800">
            {stats.totalUsers}
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2 text-[#950101]">
            Total Organizers
          </h3>
          <p className="text-3xl font-semibold text-gray-800">
            {stats.totalOrganizers}
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2 text-[#950101]">
            Total Events
          </h3>
          <p className="text-3xl font-semibold text-gray-800">
            {stats.totalEvents}
          </p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bar Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            📊 User & Event Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
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
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🥧 Data Distribution
          </h3>
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
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  );
}
