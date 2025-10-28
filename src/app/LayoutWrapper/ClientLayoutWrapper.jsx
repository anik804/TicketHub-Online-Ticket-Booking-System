"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BackToTop from "../dashboard/components/shared/BackToTop"; 
import { Toaster } from "react-hot-toast";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/auth/login",
    "/auth/register",
    "/dashboard",
    "/dashboard/admin",
    "/dashboard/organizer",
  ];

  const hideLayout = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      <Toaster position="top-right" />
      {!hideLayout && <Footer />}
      {!hideLayout && <BackToTop />}
    </>
  );
}
