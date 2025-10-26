"use client";

import React from "react";

import EventsReminder from "../../components/EventsReminder";
import DashboardSection from "../../components/shared/DashboardSection";

export default function Page() {
  return (
   <DashboardSection title="Events Reminder" role="user">
    <EventsReminder />
   </DashboardSection>
      
  );
}
