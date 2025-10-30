"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Loader2 } from "lucide-react"; // clean, lightweight icons

export default function DashboardSection({ title, children, role = "user" }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[60vh] text-gray-300">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  const userRole = session?.user?.role?.toLowerCase();
  const isAuthorized = userRole === role.toLowerCase();

  // Unauthorized state
  if (!isAuthorized) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[60vh] text-gray-300">
        <ShieldAlert className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-2xl font-semibold mb-1">Access Denied</h2>
        <p className="text-gray-400">
          You don’t have permission to view this section.
        </p>
      </div>
    );
  }

  // Authorized view
  return (
    <section className="flex-1 pt-20 pb-10 px-6 text-white overflow-hidden">
      {title && <h1 className="text-3xl font-semibold mb-6">{title}</h1>}
      <div>{children}</div>
    </section>
  );
}
