"use client";

import Sidebar from "./SidebarOld";
import { motion } from "framer-motion";

export default function DashboardLayout({ children, role }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <motion.main
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
