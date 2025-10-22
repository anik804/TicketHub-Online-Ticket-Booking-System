"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaTicketAlt } from "react-icons/fa"; // ✅ import added

// React Icons
import {
  FaCalendarPlus,
  FaClipboardList,
  FaBell,
  FaMoneyCheckAlt,
  FaTicketAlt,
  FaRegUser,
  FaUserCog,
  FaMoneyBillWave,
  FaFilm,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";

const linksConfig = {
  user: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "My Tickets", href: "my-tickets", icon: <FaTicketAlt /> },
    { label: "Profile", href: "profile", icon: <FaRegUser /> },
    { label: "Settings", href: "settings", icon: <FaUserCog /> },
    { label: "User Reminder", href: "userReminder", icon: <FaBell /> },
    { label: "Movies Payments", href: "movies-payments", icon: <FaFilm /> },
    { label: "Events Payments", href: "events-payments", icon: <FaMoneyBillWave /> },
  ],
  organizer: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "Add Event", href: "add-event", icon: <FaCalendarPlus /> },
    { label: "Manage Events", href: "Managements", icon: <FaClipboardList /> },
    { label: "Organizer Reminder", href: "organizerReminder", icon: <FaBell /> },
    { label: "Payment History", href: "paymentHistory", icon: <FaMoneyCheckAlt /> },
  ],
  admin: [
    { label: "Overview", href: "/", icon: <HiOutlineHome /> },
    { label: "All Users", href: "users", icon: <FaUsers /> },
    { label: "Make Organizer", href: "makeOrganizer", icon: <FaUserShield /> },
    { label: "Events Reminder", href: "eventsReminder", icon: <FaBell /> },
  ],
};

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const links = linksConfig[role.toLowerCase()] || [];

  return (
    <aside className="w-64 bg-gradient-to-b from-red-900 to-red-600 min-h-screen p-6 text-white flex flex-col">
      {/* 🔹 Logo Section */}
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 group transition-all duration-300"
      >
        <motion.div
          initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="text-[#f5a25d] text-3xl"
        >
          <FaTicketAlt />
        </motion.div>
        <p className="text-white text-2xl font-bold group-hover:text-[#f5a25d] transition-colors">
          Ticket<span className="text-[#f5a25d]">Hub</span>
        </p>
      </Link>

      {/* 🔹 Dashboard Title */}
      <h2 className="text-xl font-semibold mb-6 capitalize">
        {role} Dashboard
      </h2>

      {/* 🔹 Sidebar Links */}
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <motion.li key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/dashboard/${role.toLowerCase()}/${link.href}`}
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                pathname.includes(link.href)
                  ? "bg-white text-red-700 font-semibold"
                  : "hover:bg-white/20"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}
