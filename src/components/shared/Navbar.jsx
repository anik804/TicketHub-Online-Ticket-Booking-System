"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTicketAlt } from "react-icons/fa"; // 🎟️ Ticket Icon
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/browse-events", label: "Browse Events" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/Contacts", label: "Contacts" },
  ];

  const navItems = () =>
    links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className={`${
            pathname === link.href
              ? "text-red-600 font-semibold"
              : "text-gray-600 hover:text-red-500"
          }`}
        >
          {link.label}
        </Link>
      </li>
    ));

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
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg bg-white rounded-lg text-gray-700"
            >
              {navItems()}
            </ul>
          </div>

          {/* Logo with Ticket Icon + Motion */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-600 text-3xl"
            >
              <FaTicketAlt />
            </motion.div>
            <p className="text-gray-600 text-2xl font-bold">
              Ticket<span className="text-red-600">Hub</span>
            </p>
          </Link>
        </div>

        {/* Navbar Center */}
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
        <div className="navbar-end flex items-center gap-3">
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
    </div>
  );
}