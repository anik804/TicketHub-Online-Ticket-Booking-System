import React from "react";

import AllUser from "../../components/AllUser";
import DashboardSection from "../../components/shared/DashboardSection";

function page() {
  return (
    <DashboardSection title={"All Users"} role={"admin"}>
      <AllUser></AllUser>
    </DashboardSection>
  );
}

export default page;
