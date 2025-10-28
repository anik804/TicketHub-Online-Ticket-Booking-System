"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function DashboardSection({ title, children, role = "user" }) {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className=" w-full h-100 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  const isUser = session?.user?.role.toLowerCase() === role;

  if (!isUser)
    return (
      <div className=" w-full h-100 flex justify-center items-center text-white text-2xl">
        Unathorized
      </div>
    );

  return (
    <div className="flex-1 pt-20 pb-10 px-6 text-white overflow-hidden">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      {children}
    </div>
  );
}
