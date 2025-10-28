"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTicketAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Routes where navbar should NOT appear
  const hideNavbarRoutes = [
    "/dashboard",
    "/dashboard/admin",
    "/dashboard/organizer",
    "/auth/login",
    "/auth/register",
  ];

  // Detect if current page should hide navbar
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    pathname.startsWith(path)
  );

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar links
  const links = [
    { href: "/", label: "Home" },
    { href: "/browse-events", label: "Browse Events" },
    { href: "/movies", label: "Movies" },
    { href: "/blogs", label: "Blogs" },
    { href: "/Contacts", label: "Contacts" },
  ];

  // Logout handler
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ redirect: false });
      toast.success("Logged out 👋");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed 😢");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  //  If route matches hidden ones → hide navbar completely
  if (shouldHideNavbar) {
    return null;
  }

  //  Otherwise show navbar with scroll effect
  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-black shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="navbar px-6 py-3">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex p-5 items-center gap-2">
            <motion.div
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-[#d96c2c] text-3xl"
            >
              <FaTicketAlt />
            </motion.div>
            <p className="text-gray-300 text-2xl font-bold">
              Ticket<span className="text-[#d96c2c]">Hub</span>
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
                      ? "text-primary font-semibold"
                      : "text-gray-300 hover:text-[#d96c2c]"
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
          {/* Theme Toggle */}
          <ThemeToggler className={"mr-3"} />
          {status === "loading" ? null : !session ? (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-1 rounded  font-semibold hover:text-black hover:bg-white bg-[#d96c2c] text-gray-300"
              >
                Join Us
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={
                      session.user?.image || "/images/placeholder-avatar.svg"
                    }
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ul className="menu dropdown-content mt-3 w-52 shadow-lg bg-black rounded-lg p-2 text-gray-300">
                <li>
                  <Link
                    href="/profile"
                    className="hover:text-gray-500 rounded-md"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/dashboard`}
                    className="hover:text-gray-500 rounded-md"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`w-full text-[#d96c2c] hover:text-gray-500 rounded-md px-3 py-1 transition-all ${
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
            <div className="bg-black w-72 h-76 p-6 shadow-xl">
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
                          : "text-gray-300 hover:text-gray-500"
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
              className="flex-1  cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
