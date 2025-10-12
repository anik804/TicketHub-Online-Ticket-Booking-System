"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

export default function PageLayout({ children, title }) {
  const { data: session, status } = useSession();

  // Show loader while session state is being determined
  if (status === "loading") {
    return <Loading />;
  }

  // Prevent flicker when user is not authenticated
  if (!session) return null;

  return (
    <section className="min-h-screen flex justify-center items-center px-6 py-12 bg-gradient-to-b from-white to-gray-50 text-gray-900 transition-colors duration-500">
      <div className="w-full max-w-4xl bg-orange-50 dark:bg-gray-800 shadow-2xl rounded-3xl border border-orange-200 p-5 md:p-8 lg:p-12 transition-all duration-500">
        {/* Title */}
        {title && (
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 sm:mb-12 bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] bg-clip-text text-transparent">
            {title}
          </h1>
        )}

        {/* Main Content */}
        <div className="animate-fadeIn">{children}</div>
      </div>
    </section>
  );
}
