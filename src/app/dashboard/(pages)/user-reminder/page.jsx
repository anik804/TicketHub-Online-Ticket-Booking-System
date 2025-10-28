import React from "react";
import UserReminders from "../../components/UserReminders";
import DashboardSection from "../../components/shared/DashboardSection";

export default function page() {
  return (

     <DashboardSection title="User Reminders"> 
      <UserReminders></UserReminders>
     </DashboardSection>
   
  );
}
