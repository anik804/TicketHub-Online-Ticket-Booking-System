import React from "react";

import PaymentHistory from "../../components/PaymentHistory";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
   <DashboardSection title="Payment History" role="organizer" ><PaymentHistory /></DashboardSection>
  );
}
