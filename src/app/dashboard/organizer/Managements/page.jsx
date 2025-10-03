import React from "react";
import Sidebar from "../../components/Sidebar";
import TicketManagements from "../../components/TicketManagements"


function page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar role="Organizer" />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6">
        <TicketManagements/>
      </main>
    </div>
  );
}

export default page;
