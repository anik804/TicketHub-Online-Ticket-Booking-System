"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Organizer Info */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
        <h2 className="text-2xl font-bold mb-2">Organizer Profile</h2>
        <p>
          <span className="font-semibold">Name:</span> {session?.user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {session?.user.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2">Total Events</h3>
          <p className="text-gray-600 text-2xl">{stats.totalEvents}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2">Pending Events</h3>
          <p className="text-gray-600 text-2xl">{stats.pendingEvents}</p>
        </motion.div>
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-bold mb-2">Total Profit</h3>
          <p className="text-gray-600 text-2xl">${stats.totalProfit}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
