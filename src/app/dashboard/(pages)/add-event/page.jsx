import React from "react";

import AddEvents from "../../components/AddEvents";
import DashboardSection from "../../components/shared/DashboardSection";

function page() {
  return (
    <DashboardSection title="Add Event" role="organizer">
      <AddEvents></AddEvents>
    </DashboardSection>
  );
}

export default page;
