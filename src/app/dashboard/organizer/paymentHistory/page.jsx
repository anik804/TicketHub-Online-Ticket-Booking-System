import React from 'react'
import Sidebar from '../../components/Sidebar'
import PaymentHistory from '../../components/PaymentHistory'

export default function page() {
  return (
       <div className="flex min-h-screen">
              {/* Sidebar on the left */}
              <Sidebar role="Organizer" />
        
              {/* Main Content Area */}
              <main className="flex-1 bg-gray-50 p-6">
              <PaymentHistory></PaymentHistory>
              </main>
            </div>
  )
}
