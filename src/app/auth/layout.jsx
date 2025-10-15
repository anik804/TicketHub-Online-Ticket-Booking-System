"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function AuthLayout({children}) {
    const pathname = usePathname();
    const authLinks = [
        { name: "Login", href: "/auth/login" },
        { name: "Register", href: "/auth/register" },
    ]
  return (
    <main className=" w-full min-h-dvh relative py-20 px-5">
        <Toaster position="top-right" />
      <div
        className="absolute inset-0 -z-1"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #f59e0b 100%)`,
          backgroundSize: "100% 100%",
        }}
      />
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="z-1 justify-center items-center h-full w-full max-w-xl mx-auto bg-base-100 rounded-lg overflow-hidden">
        <nav className="h-20 w-full items-center grid grid-cols-2 gap-0 shadow mb-3">
        {
        authLinks.map((link) => (
        <Link key={link.name} href={link.href} className={`w-full h-full text-2xl md:text-3xl font-semibold flex items-center justify-center border-b-4 border-primary ${pathname === link.href ? "bg-primary text-white" : "text-primary bg-base-100 hover:bg-base-200"}`} >{link.name}</Link>
        ))
        }
            
        </nav>

        {children}

      </motion.section>
    </main>
  );
}
