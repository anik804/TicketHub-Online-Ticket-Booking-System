import React from "react";

import TicketManagements from "../../components/TicketManagements";
import DashboardSection from "../../components/shared/DashboardSection";

function page() {
  return (
    
     <DashboardSection title="Ticket Managements" role="organizer"> 
      <TicketManagements></TicketManagements>
     </DashboardSection>
 
  );
}

export default page;
