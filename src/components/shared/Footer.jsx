"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const companyLinks = [
    { href: "/about", label: "About us" },
    { href: "/Contacts", label: "Contact" },
    { href: "/refund", label: "Refund Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-[#000000] text-base-content p-10">
        
        {/* Services */}
      <nav>
  <h6 className="footer-title text-[#d96c2c]">Services</h6>

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
      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#d96c2c] transition-all duration-300 ease-in-out group-hover:w-full"></span>
    </p>
  ))}
      </nav>


        {/* Company */}
     <nav>
  <h6 className="footer-title text-[#d96c2c]">Company</h6>

  {companyLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`relative block mt-1 group transition-colors ${
        pathname === link.href
          ? "text-[#d96c2c] font-semibold"
          : "text-gray-400 hover:text-[#d96c2c]"
      }`}
    >
      {link.label}
      <span
        className={`absolute left-0 bottom-0 h-[1px] transition-all duration-300 ease-in-out ${
          pathname === link.href
            ? "w-full bg-[#d96c2c]"
            : "w-0 bg-[#d96c2c] group-hover:w-full"
        }`}
      ></span>
    </Link>
  ))}
     </nav>


        {/* Social */}
        <nav>
  <h6 className="footer-title text-[#d96c2c]  mb-2">Social</h6>
  <div className="flex gap-4 mt-2">
    <a
      href="https://www.facebook.com/TicketHubDemo"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#d96c2c] transition-colors"
      aria-label="Facebook"
    >
      <Facebook size={24} />
    </a>
    <a
      href="https://twitter.com/TicketHubDemo"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#d96c2c] transition-colors"
      aria-label="Twitter"
    >
      <Twitter size={24} />
    </a>
    <a
      href="https://www.instagram.com/TicketHubDemo"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#d96c2c] transition-colors"
      aria-label="Instagram"
    >
      <Instagram size={24} />
    </a>
  </div>
        </nav>

      </footer>

      {/* Bottom Footer */}
      <div className="bg-[#000000] text-center py-4 text-sm border-t border-gray-700">
        <p className="text-gray-400">© 2025 TicketHub. All Rights Reserved.</p>
      </div>
    </div>
  );
}
