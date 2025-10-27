"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTicketAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "./components/shared/dashboardLinks";
import { universalLinks } from "./components/shared/searchedLinks";
import Image from "next/image";
import Button from "@/ui/Button";
import { motion } from "motion/react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  const role = session?.user?.role;
  const userPhoto = session?.user?.image;

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [searchedLinks, setSearchedLinks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!role) return;
    setSearchedLinks([...dashboardLinks.user, ...universalLinks]);
  }, [role]);

  // Filter the menu based on search input
  const filteredMenu = role
    ? searchedLinks.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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

        <div className="bg-[#28313f] h-10 flex-1 rounded-md shadow relative text-white">
          <motion.input
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-ghost px-3 py-2 w-full focus:bg-gray-700 text-white"
          />

          {searchTerm !== "" && (
            <div className="absolute top-10 left-0 w-full bg-[#1c232f] shadow h-auto transition-all duration-300 ease-in-out">
              {filteredMenu.map((item) => (
                <Link
                  key={item.label}
                  href={`${item.href}`}
                  className="block px-4 py-3 text-white hover:bg-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Button className={"h-10"} label="Sign Out" onClick={() => signOut()}/>

        <div className="size-10 rounded-full bg-green-300 overflow-hidden shadow">
          {
            <Image src={userPhoto} alt="user" width={40} height={40} className="object-cover w-full h-full" />
          }
        </div>
      </nav>

      <section className=" flex gap-0  relative">
        {/* sidebar */}
        <aside
          className={`sticky top-0 left-0 h-dvh border-r-[0.5px] border-primary/30  z-50 pt-15 text-white shadow shadow-black/50 transition-all duration-300 ease-in-out  ${
            collapsed ? "w-18" : "lg:w-70 w-60"
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
            dashboardLinks[role].map((link) => (
              <Link
                key={link.label}
                href={`/dashboard${link.href}`}
                className={`w-full h-14 flex items-center justify-start hover:bg-gray-800 cursor-pointer border-l-4  ${
                  pathname === `/dashboard${link.href}`
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
