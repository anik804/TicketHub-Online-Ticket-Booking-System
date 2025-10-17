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
  <h6 className="footer-title text-[#d96c2c] mb-2">Social</h6>
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
      // {
      //   href: "https://www.pinterest.com/TicketHubDemo",
      //   icon: (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       width="20"
      //       height="20"
      //       fill="currentColor"
      //       viewBox="0 0 24 24"
      //     >
      //       <path d="M12 0C5.372 0 0 5.372 0 12c0 4.991 3.657 9.128 8.438 10.297-.117-.875-.223-2.219.047-3.176.242-.83 1.563-5.289 1.563-5.289s-.398-.797-.398-1.977c0-1.852 1.074-3.238 2.41-3.238 1.136 0 1.684.852 1.684 1.875 0 1.141-.723 2.836-1.094 4.414-.312 1.309.656 2.383 1.941 2.383 2.328 0 3.883-2.965 3.883-6.465 0-2.664-1.793-4.664-5.047-4.664-3.68 0-5.977 2.758-5.977 5.848 0 1.063.312 1.82.797 2.395.223.266.25.375.172.68-.055.223-.188.75-.25.961-.078.312-.32.422-.59.309-1.648-.68-2.414-2.5-2.414-4.547 0-3.391 2.859-7.469 8.523-7.469 4.547 0 7.547 3.289 7.547 6.812 0 4.688-2.609 8.195-6.445 8.195-1.289 0-2.504-.672-2.922-1.469l-.793 3.023c-.285 1.078-1.062 2.43-1.586 3.25 1.18.359 2.43.555 3.73.555 6.629 0 12-5.372 12-12S18.629 0 12 0z" />
      //     </svg>
      //   ),
      //   label: "Pinterest",
      // },
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
                   transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#d96c2c]/20"
      >
        {icon}
      </a>
    ))}
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
