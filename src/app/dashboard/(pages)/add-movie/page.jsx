import React from "react";

import AddEvents from "../../components/AddEvents";
import DashboardSection from "../../components/shared/DashboardSection";
import AddMovie from "../../components/AddMovie";

function page() {
  return (
    <DashboardSection title="" role="movieadmin">
      <AddMovie></AddMovie>
    </DashboardSection>
  );
}

export default page;
