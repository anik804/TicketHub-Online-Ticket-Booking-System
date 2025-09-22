"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
              ? "text-[#FF0000] font-semibold border-[#FF0000]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      </li>
    ));

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ redirect: false }); // Prevent automatic redirect
      toast.success("Successfully logged out 👋");
      router.push("/"); // Manual redirect to home
    } catch (error) {
      toast.error("Logout failed 😢");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="navbar bg-[#000000] shadow-sm">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {navItems()}
            </ul>
          </div>
          <Link href={"/"} className="gap-2 flex text-xl">
            <Image
              className="rounded"
              alt="TicketHub Logo"
              src={"/assets/images (10).png"}
              width={32}
              height={32}
            />
            <p className="text-white text-2xl font-bold">
              Ticket<span className="text-[#FF0000]">Hub</span>
            </p>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems()}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {status === "loading" ? null : !session ? (
            <Link
              href="/auth/login"
              className="btn border border-gray-600 bg-[#000000] text-gray-400 rounded-md shadow-none"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={session.user?.image || "/images/placeholder-image.svg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href={`/dashboard/${session.user.role.toLowerCase()}`}>Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`text-red-600 ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoggingOut}
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
