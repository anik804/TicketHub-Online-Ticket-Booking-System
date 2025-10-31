"use client";

import Button from "@/ui/Button";
import { motion } from "motion/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaSearch, FaTicketAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { dashboardLinks } from "./components/shared/dashboardLinks";
import { universalLinks } from "./components/shared/searchedLinks";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  const role = session?.user?.role.toLowerCase();
  const userPhoto = session?.user?.image;

  const inputRef = useRef(null);

  useEffect(() => {
    const handleShortcut = (event) => {
      // Check if Ctrl + K (Windows/Linux) or ⌘ + K (Mac) pressed
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      const keyCombo = isMac
        ? event.metaKey && event.key === "k"
        : event.ctrlKey && event.key === "k";

      if (keyCombo) {
        event.preventDefault(); // prevent browser search
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchedLinks, setSearchedLinks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!role) return;
    setSearchedLinks([...dashboardLinks[role], ...universalLinks]);
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
        <div className="flex items-center gap-2 text-white">
          <HiOutlineMenu
            onClick={() => setMobileMenu(!mobileMenu)}
            className="size-8 md:hidden"
          />

          <Link
            href="/"
            className="flex items-center text-[22px] md:text-2xl font-bold gap-2 md:w-50 "
          >
            <FaTicketAlt className="text-primary" />
            <span className="text-white">Ticket</span>
            <span className="text-primary">Hub</span>
          </Link>
        </div>

        <div
          onClick={() => setMobileMenu(false)}
          className={`md:hidden absolute top-16 left-0 w-full h-fit bg-primary transition-all py-4 duration-300 ease-in-out ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {role ? (
            dashboardLinks[role].map((link) => (
              <Link
                key={link.label}
                href={`/dashboard${link.href}`}
                className={`w-full h-14 flex items-center justify-start hover:bg-gray-800 cursor-pointer border-l-4  ${
                  pathname === `/dashboard${link.href}`
                    ? "bg-gray-800 text-primary border-transparent"
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

          <div className="bg-[#142137] w-1/3 mx-auto h-1 mt-5 rounded-full" />
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          durration={0.2}
          className="bg-[#142137] h-10 flex-1 rounded-md shadow relative text-white hidden md:flex items-center text-sm"
        >
          <FaSearch className="size-5 ml-2 opacity-80 absolute top-[10px] left-2" />
          <input
            type="text"
            ref={inputRef}
            placeholder="Search in TicketHub (Ctrl + K)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-ghost pl-12 pr-3 py-2 w-full text-white bg-transparent border border-transparent focus:border focus:border-primary/30 focus:bg-[#181f2b] focus-within:ring-0 outline-none transition-colors duration-200 rounded-md"
          />

          {searchTerm !== "" && (
            <div className="absolute top-10 left-0 w-full bg-[#181f2b] shadow h-auto transition-all duration-300 ease-in-out">
              {filteredMenu.map((item) => (
                <Link
                  key={item.label}
                  href={`${item.href}`}
                  className="block px-4 py-3 text-white hover:bg-[#142137]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        <div className="flex items-center gap-2">
          <Button
            className={"h-8 md:h-10"}
            label="Sign Out"
            onClick={() => signOut()}
          />

          <div className="size-8 md:size-10 rounded-full overflow-hidden shadow">
            {
              <Image
                src={userPhoto || "/images/placeholder-avatar.svg"}
                alt="user"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            }
          </div>
        </div>
      </nav>

      <section className=" flex flex-col md:flex-row gap-0 relative">
        {/* sidebar */}
        <aside
          className={`hidden md:flex flex-col sticky top-0 left-0 h-dvh border-r-[0.5px] border-primary/30 z-50 pt-15 text-white shadow shadow-black/50 transition-all duration-300 ease-in-out  ${
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
