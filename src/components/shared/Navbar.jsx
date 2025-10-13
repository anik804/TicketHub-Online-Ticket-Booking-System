"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTicketAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse-events", label: "Browse Events" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/Contacts", label: "Contacts" },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ redirect: false });
      toast.success("Successfully logged out 👋");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed 😢");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full shadow-md bg-white">
      <div className="navbar px-6 py-3">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-red-600 text-3xl"
            >
              <FaTicketAlt />
            </motion.div>
            <p className="text-gray-600 text-2xl font-bold">
              Ticket<span className="text-red-600">Hub</span>
            </p>
          </Link>
        </div>

        {/* Navbar Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    pathname === link.href
                      ? "text-red-600  font-semibold"
                      : "text-gray-600 hover:bg-red-100 hover:text-red-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {status === "loading" ? null : !session ? (
            <Link
              href="/auth/login"
              className="btn rounded-md bg-gradient-to-r from-[#950101] to-[#FF0000] font-semibold hover:opacity-95 transition text-white"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={session.user?.image || "/images/placeholder-avatar.svg"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul className="menu dropdown-content mt-3 w-52 shadow-lg bg-white rounded-lg p-2 text-gray-700">
                <li>
                  <Link href="/profile" className="hover:bg-gray-100 rounded-md">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/dashboard/${session.user.role.toLowerCase()}`}
                    className="hover:bg-gray-100 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`w-full text-red-600 hover:bg-red-100 rounded-md px-3 py-1 transition-all ${
                      isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 📱 Fullscreen Mobile Menu */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed inset-0 z-50 flex backdrop-blur-sm bg-black/40"
    >
      {/* Sidebar */}
      <div className="bg-white w-72 h-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#d96c2c]">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-lg font-medium ${
                  pathname === link.href
                    ? "text-[#d96c2c]"
                    : "text-gray-700 hover:text-[#d96c2c]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay area (click outside to close) */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => setMenuOpen(false)}
      />
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
