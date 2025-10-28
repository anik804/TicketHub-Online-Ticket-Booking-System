import React from "react";

import MakeOrganizer from "../../components/MakeOrganizer";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
    <DashboardSection title="Make Organizer" role="admin">
      <MakeOrganizer></MakeOrganizer>
    </DashboardSection>
  );
}
