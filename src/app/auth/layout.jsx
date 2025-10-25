"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthLayout({children}) {
    const pathname = usePathname();
    const authLinks = [
        { name: "Login", href: "/auth/login" },
        { name: "Register", href: "/auth/register" },
    ]
  return (
    <main className="w-full min-h-dvh relative py-20 px-5 overflow-hidden">
        <Toaster position="top-right" />

      <Image src={"/auth-bg.jpeg"} alt="auth-bg" width={1000} height={1000} className="fixed w-screen object-cover left-0 top-0 inset-0 -z-1 opacity-20 blur-[2px]" />
      <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative z-2 justify-center items-center h-full w-full max-w-xl mx-auto bg-base-100 rounded-md overflow-hidden border border-primary/50 shadow-xl">
        <nav className="h-16 md:h-18 w-full items-center flex gap-0 shadow mb-3">
        {
        authLinks.map((link) => (
        <Link key={link.name} href={link.href} className={`h-full text-2xl md:text-3xl font-semibold flex items-center justify-center border-b-4 border-primary ${pathname === link.href ? "w-full bg-primary text-white" : "w-4/5 text-primary bg-base-100 hover:bg-base-200"} transition-all duration-900 ease-in-out`} >{link.name}</Link>
        ))
        }
            
        </nav>

        {children}

      </motion.section>
    </main>
  );
}
