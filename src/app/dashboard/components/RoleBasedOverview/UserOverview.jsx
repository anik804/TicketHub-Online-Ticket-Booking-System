"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function UserOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    pastEvents: 0,
  });

  useEffect(() => {
    if (!session) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/user/stats?email=${session.user.email}`);
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      }
    };

    fetchStats();
  }, [session]);

  return (

 
        <motion.div 
        className="pt-20 w-full"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* User Info */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-2xl font-bold mb-2">User Profile</h2>
          <p><span className="font-semibold">Name:</span> {session?.user.name}</p>
          <p><span className="font-semibold">Email:</span> {session?.user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Total Bookings</h3>
            <p className="text-gray-600 text-2xl">{stats.totalBookings}</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
            <p className="text-gray-600 text-2xl">{stats.upcomingEvents}</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold mb-2">Past Events</h3>
            <p className="text-gray-600 text-2xl">{stats.pastEvents}</p>
          </motion.div>
        </div>
      </motion.div>
   

  );
}
