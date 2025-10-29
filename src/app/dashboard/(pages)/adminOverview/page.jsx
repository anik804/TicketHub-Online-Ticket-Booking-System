import React from "react";
import AdminOverview from "../../components/RoleBasedOverview/AdminOverview";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (
    <DashboardSection role="admin">
      <AdminOverview></AdminOverview>
    </DashboardSection>
  );
}
