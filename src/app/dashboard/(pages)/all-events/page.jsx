import React from "react";
import AllEvents from "../../components/AllEvents";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
    <DashboardSection title="All Events" role="organizer">
      <AllEvents></AllEvents>
    </DashboardSection>
  );
}
