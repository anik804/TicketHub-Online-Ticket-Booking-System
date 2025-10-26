"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTicketAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { dashbordLinks } from "./components/shared/dashboardLinks";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  const role = session?.user?.role;

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <main className="w-full min-h-dvh bg-[#131a26]">
      <nav className="fixed top-0 left-0 w-full h-16 flex items-center justify-between gap-4 px-4 border-b-[0.5px] border-primary/30 z-51 bg-[#131a26] shadow shadow-black/50">
        {/* Page Title */}
        <Link
          href="/"
          className="flex items-center text-2xl font-bold gap-2 w-50 "
        >
          <FaTicketAlt className="text-primary" />
          <span className="text-white">Ticket</span>
          <span className="text-primary">Hub</span>
        </Link>

        <div className="bg-[#1c232f] h-10 flex-1 rounded-md shadow"></div>

        <div className="size-10 rounded-full bg-green-300"></div>
      </nav>

      <section className=" flex gap-0  relative">
        {/* sidebar */}
        <aside
          className={`sticky top-0 left-0 h-dvh border-r-[0.5px] border-primary/30  z-50 pt-15 text-white shadow shadow-black/50 transition-all duration-300 ease-in-out  ${
            collapsed ? "w-18" : "lg:w-70 w-56"
          }`}
        >
          <div className="w-full h-16 flex items-center justify-start border-b border-white/10 ">
            <span
              onClick={() => setCollapsed(!collapsed)}
              className="min-w-16 flex items-center justify-center text-lg cursor-pointer"
            >
              <FaBars />
            </span>
            <div
              className={`text-white text-base lg:text-lg font-semibold whitespace-nowrap transform transition-all duration-300 ease-in-out ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Dashboard
            </div>
          </div>
          {/* Navigation Links */}
          {role ? (
            dashbordLinks[role.toLowerCase()].map((link) => (
              <Link
                key={link.label}
                href={`/dashboard/${link.href}`}
                className={`w-full h-14 flex items-center justify-start hover:bg-gray-800 cursor-pointer border-l-4  ${
                  pathname === `/dashboard/${link.href}`
                    ? "bg-gray-800 text-primary border-primary"
                    : "border-transparent"
                }`}
              >
                <span className="min-w-16 flex items-center justify-center text-lg">
                  {link.icon}
                </span>
                <span
                  className={`h-8 whitespace-nowrap flex items-center transform transition-all duration-300 ease-in-out ${
                    collapsed ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-30">
              <span className="loading loading-dots loading-md" />
            </div>
          )}
        </aside>

        {children}
      </section>
    </main>
  );
}
