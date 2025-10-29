import React from "react";

import OrganizerReminder from "../../components/OrganizerReminder";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
 
      <DashboardSection role="organizer"> 
      <OrganizerReminder></OrganizerReminder>
      </DashboardSection>

  );
}
