"use client";

import { useSession } from "next-auth/react";
import React from "react";
import AdminOverview from "./components/RoleBasedOverview/AdminOverview";
import MovieAdminOverview from "./components/RoleBasedOverview/MovieAdminOverview";
import UserOverview from "./components/RoleBasedOverview/UserOverview";
import OrganizerOverview from "./components/RoleBasedOverview/OrganizerOverview";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const role = session?.user?.role;

  return (
    <>
      {role || (
        <div className="flex flex-col items-center justify-center h-50">
          <span className="loading loading-dots loading-lg" />
        </div>
      )}
      {role === "admin" && <AdminOverview />}
      {role === "Organizer" && <OrganizerOverview />}
      {role === "movieAdimn" && <MovieAdminOverview />}
      {role === "user" && <UserOverview />}
    </>
  );
}
