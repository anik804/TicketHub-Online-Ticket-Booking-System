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
          <h6 className="footer-title text-gray-400">Services</h6>
          <p className="text-gray-400 hover:text-[#FF0000] transition-colors cursor-pointer">
            Online Ticket Booking
          </p>
          <p className="text-gray-400 hover:text-[#FF0000] transition-colors cursor-pointer">
            Real-time Seat Selection
          </p>
          <p className="text-gray-400 hover:text-[#FF0000] transition-colors cursor-pointer">
            Secure Payment
          </p>
          <p className="text-gray-400 hover:text-[#FF0000] transition-colors cursor-pointer">
            E-Ticket with QR Code
          </p>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="footer-title text-gray-400">Company</h6>
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block mt-1 ${
                pathname === link.href
                  ? "text-[#FF0000] font-semibold"
                  : "text-gray-400 hover:text-[#FF0000] transition-colors"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <nav>
          <h6 className="footer-title text-gray-400 mb-2">Social</h6>
          <div className="flex gap-4 mt-2">
            <a className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a className="text-gray-400 hover:text-[#FF0000] transition-colors" aria-label="Instagram">
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
