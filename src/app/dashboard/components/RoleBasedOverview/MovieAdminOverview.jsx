"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Film, Clock, DollarSign } from "lucide-react";
import DashboardSection from "../shared/DashboardSection";

export default function MovieAdminOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalEvents: 0,
    pendingEvents: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    if (!session) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `/api/organizer/stats?email=${session.user.email}`
        );
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, [session]);

  const chartData = [
    { name: "Total Events", value: stats.totalEvents },
    { name: "Pending", value: stats.pendingEvents },
    { name: "Profit", value: stats.totalProfit },
  ];

  return (
    <DashboardSection title="Movie Admin Overview" role="movieAdmin">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6"
      >
        {/* Organizer Info */}
        <motion.div
          className="mb-10 p-6 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl shadow-lg"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-2">Organizer Profile</h2>
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {session?.user.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {session?.user.email}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            className="p-6 bg-white border-l-4 border-orange-500 rounded-xl shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">Total Events</h3>
              <Film className="text-orange-500" size={28} />
            </div>
            <p className="text-3xl font-bold text-gray-700">
              {stats.totalEvents}
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white border-l-4 border-orange-500 rounded-xl shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">
                Pending Events
              </h3>
              <Clock className="text-orange-500" size={28} />
            </div>
            <p className="text-3xl font-bold text-gray-700">
              {stats.pendingEvents}
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white border-l-4 border-orange-500 rounded-xl shadow-md hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">Total Profit</h3>
              <DollarSign className="text-orange-500" size={28} />
            </div>
            <p className="text-3xl font-bold text-gray-700">
              ${stats.totalProfit.toLocaleString()}
            </p>
          </motion.div>
        </div>

        {/* Recharts Visualization */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Performance Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </DashboardSection>
  );
}
