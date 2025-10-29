"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaTicketAlt,
} from "react-icons/fa";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

  const companyLinks = [
    // { href: "/about", label: "About us" },
    { href: "/Contacts", label: "Contact" },
    { href: "/refund", label: "Refund Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  return (
    <footer className="bg-[#000000] text-gray-400">
      {/*  Top Bar */}
      <div className="border-b border-gray-800 flex flex-col md:flex-row items-center justify-between px-8 py-4 text-sm">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <motion.div
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-[#d96c2c] text-3xl"
          >
          <FaTicketAlt />
          </motion.div>
          <p className="text-gray-200 text-2xl font-bold">
            Ticket<span className="text-[#d96c2c]">Hub</span>
          </p>
        </div>

        {/* Help & Privacy */}
        <div className="flex gap-2 text-gray-400 mb-3 md:mb-0">
          <Link href="/help" className="hover:text-[#d96c2c] transition">
            Help
          </Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-[#d96c2c] transition">
            Privacy Policy
          </Link>
        </div>

        {/* Social */}
<nav>
  <h6 className="footer-title text-[#d96c2c] mb-2">Social</h6>
  <p className=" text-gray-400">
    Follow us on social media for the latest updates!
  </p>
  <div className="flex gap-4 mt-2">
    {[
      {
        href: "https://twitter.com/TicketHubDemo",
        icon: <Twitter size={20} />,
        label: "Twitter",
      },
      {
        href: "https://www.facebook.com/TicketHubDemo",
        icon: <Facebook size={20} />,
        label: "Facebook",
      },
      {
        href: "https://www.instagram.com/TicketHubDemo",
        icon: <Instagram size={20} />,
        label: "Instagram",
      },
    ].map(({ href, icon, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-12 h-12 rounded-full bg-[#1c1c1c] flex items-center justify-center text-gray-300 hover:text-[#d96c2c] 
                   transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d96c2c]/40"
      >
        {icon}
      </a>
    ))}
  </div>
</nav>

      </div>

      {/* Orange Divider */}
      <div className="h-[1px] bg-[#131313] w-full"></div>

      {/* Main Footer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-8 py-14 max-w-6xl mx-auto">
        {/* About + Button */}
        <div>
          <p className="text-gray-400 leading-relaxed mb-4">
            Buy movie tickets easily with <br />
            TicketHub system nationwide.
          </p>
          <button className="bg-[#d96c2c] hover:bg-[#e07836] text-white text-sm px-5 py-2 font-semibold rounded transition">
            Get Your Ticket
          </button>
        </div>
  {/* Services */}
      <nav>
  <h6 className="footer-title text-[#d96c2c] ">Services</h6>

  {[
    "Online Ticket Booking",
    "Real-time Seat Selection",
    "Secure Payment",
    "E-Ticket with QR Code",
  ].map((service, index) => (
    <p
      key={index}
      className="relative text-gray-400 hover:text-[#d96c2c] transition-colors cursor-pointer group mt-1"
    >
      {service}
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#d96c2c] transition-all duration-300 ease-in-out group-hover:w-30"></span>
    </p>
  ))}
      </nav>

        {/* Links Section */}
        
     <nav>
  <h6 className="footer-title text-[#d96c2c] ">Links</h6>

  {companyLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`relative block mt-1 group transition-colors ${
        pathname === link.href
          ? "text-[#d96c2c] font-semibold"
          : "text-gray-400 hover:text-[#d96c2c] "
      }`}
    >
      {link.label}
      <span
        className={`absolute left-0 bottom-0 h-[1px] transition-all duration-300  ${
          pathname === link.href
            ? "w-0 bg-[#d96c2c]"
            : "w-0 bg-[#d96c2c] "
        }`}
      ></span>
    </Link>
  ))}
     </nav>

        {/* Optional: Empty Column for Balance */}
        <div></div>
      </div>

      {/*  Bottom Footer */}
      <div className="bg-[#131313] text-center py-4 border-t border-gray-800 text-sm text-gray-500">
        © Copyright 2025 by TicketHub.com
      </div>
    </footer>
  );
}
