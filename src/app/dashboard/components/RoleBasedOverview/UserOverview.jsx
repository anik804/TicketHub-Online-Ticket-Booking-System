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

export default function UserOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalBookings: 120,
    upcomingEvents: 3,
    pastEvents: 25,
    totalSpent: 15400,
    favoriteCategory: "Movies",
  });

  // Fake chart data
  const bookingsData = [
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
  ];

  const categoryData = [
    { name: "Movies", value: 45 },
    { name: "Events", value: 30 },
    { name: "Concerts", value: 15 },
    { name: "Sports", value: 10 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  useEffect(() => {
    if (!session) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/user/stats?email=${session.user.email}`);
        const data = await res.json();
        if (res.ok) {
          setStats((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      }
    };

    fetchStats();
  }, [session]);

  return (
    <DashboardSection role="user" title={`User Dashboard`}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* User Info */}
      <div className="mb-10 p-6 bg-[#142137] rounded-md shadow-md border-[0.5px] border-primary/30">
        <h2 className="text-3xl font-semibold mb-3 ">
          Welcome Back, {session?.user.name?.split(" ")[0] || "User"} 👋
        </h2>
        <p className="text-gray-600">Email: {session?.user.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <StatCard title="Total Bookings" value={stats.totalBookings} />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} />
        <StatCard title="Past Events" value={stats.pastEvents} />
        <StatCard title="Total Spent (BDT)" value={`৳${stats.totalSpent}`} />
        <StatCard title="Favorite Category" value={stats.favoriteCategory} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Line Chart */}
        <motion.div
          className="p-6 bg-[#142137] rounded-md shadow-md border-[0.5px] border-primary/30"
          whileHover={{ scale: 1.01 }}
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
          className=" p-6 bg-[#142137] rounded-md shadow-md border-[0.5px] border-primary/30"
          whileHover={{ scale: 1.01 }}
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
                fill="#8884d8"
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

// Reusable Stat Card component
function StatCard({ title, value }) {
  return (
    <motion.div
      className="p-6 bg-[#142137] rounded-md shadow-md border-[0.5px] border-primary/30 transition"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-primary text-sm uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
