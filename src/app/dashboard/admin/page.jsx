"use client";

import DashboardLayout from "../components/DashboardLayout";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrganizers: 0,
    totalEvents: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout role="Admin">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Total Users</h3>
            <p className="text-gray-600 text-2xl">{stats.totalUsers}</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Total Organizers</h3>
            <p className="text-gray-600 text-2xl">{stats.totalOrganizers}</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Total Events</h3>
            <p className="text-gray-600 text-2xl">{stats.totalEvents}</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
            <p className="text-gray-600 text-2xl">${stats.totalRevenue}</p>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
