import React from "react";

import OrganizerReminder from "../../components/OrganizerReminder";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
 
      <DashboardSection title="Organizer Reminders" role="organizer"> 
      <OrganizerReminder></OrganizerReminder>
      </DashboardSection>

  );
}
