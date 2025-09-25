import React from "react";
import Sidebar from "../../components/Sidebar";
import AllUser from "../../components/AllUser";

function page() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar role="Admin" />

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 p-6">
        <AllUser></AllUser>
      </main>
    </div>
  );
}

export default page;
