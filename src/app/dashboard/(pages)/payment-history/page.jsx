import React from "react";

import PaymentHistory from "../../components/PaymentHistory";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
   <DashboardSection  role="organizer" ><PaymentHistory /></DashboardSection>
  );
}
