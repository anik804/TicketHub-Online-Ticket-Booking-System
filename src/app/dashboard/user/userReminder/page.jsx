import React from 'react'
import UserReminders from '../../components/UserReminders'
import Sidebar from '../../components/Sidebar'

export default function page() {
  return (
   <div className="flex min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar role="User" />
  
        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 p-6">
          <UserReminders />
        </main>
      </div>
  )
}
