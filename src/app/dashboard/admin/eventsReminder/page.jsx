"use client";

import React from "react";

import Sidebar from "../../components/Sidebar";
import EventsReminder from "../../components/EventsReminder";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar role="Admin" />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6">
        <EventsReminder />
      </main>
    </div>
  );
}
