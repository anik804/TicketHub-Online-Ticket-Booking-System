"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const linksConfig = {
  user: [
    { label: "Overview", href: "/" },
    { label: "My Tickets", href: "tickets" },
    { label: "Profile", href: "profile" },
    { label: "Settings", href: "settings" },
    { label: "User Reminder", href: "userReminder" },
    { label: "Transactions", href: "transactions-history" },
  ],
  organizer: [
    { label: "Overview", href: "/" },
    { label: "Add Event", href: "add-event" },
    { label: "Manage Events", href: "Managements" },
    { label: "Organizer Reminder", href: "organizerReminder" },
    { label: "Payment History", href: "paymentHistory" },
  ],
  admin: [
    { label: "Overview", href: "/" },
    { label: "All Users", href: "users" },
    { label: "All Events", href: "events" },
    { label: "Events Reminder", href: "eventsReminder" },
  ],
};

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const links = linksConfig[role.toLowerCase()] || [];

  return (
    <aside className="w-64 bg-gradient-to-b from-red-900 to-red-600 min-h-screen p-6 text-white">
      <h2 className="text-2xl font-bold mb-8 capitalize">{role} Dashboard</h2>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <motion.li
            key={link.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/dashboard/${role.toLowerCase()}/${link.href}`}
              className={`block px-4 py-2 rounded transition-colors ${
                pathname.includes(link.href)
                  ? "bg-white text-red-700 font-semibold"
                  : "hover:bg-white/20"
              }`}
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}
