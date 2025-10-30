"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AdminOverview from "./components/RoleBasedOverview/AdminOverview";
import MovieAdminOverview from "./components/RoleBasedOverview/MovieAdminOverview";
import UserOverview from "./components/RoleBasedOverview/UserOverview";
import OrganizerOverview from "./components/RoleBasedOverview/OrganizerOverview";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <span className="loading loading-dots loading-lg" />
      </div>
    );
  }

  const userRole = session?.user?.role.toLowerCase();

  console.log(userRole);

  // If no role or session not ready yet
  if (!userRole) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
        <p>Role not recognized. Please contact support.</p>
      </div>
    );
  }

  if (userRole === "admin") {
    return <AdminOverview />;
  }

  if (userRole === "movieadmin") {
    return <MovieAdminOverview />;
  }

  if (userRole === "organizer") {
    return <OrganizerOverview />;
  }

  if (userRole === "user") {
    return <UserOverview />;
  }
}
