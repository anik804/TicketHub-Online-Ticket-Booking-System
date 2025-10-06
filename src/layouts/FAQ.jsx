import React from 'react'

export default function FAQ() {
  return (
 <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                     bg-clip-text text-transparent drop-shadow-lg mb-8">
        ❓ Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {/* Q1 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            How do I book a ticket on TicketHub?
          </div>
          <div className="collapse-content text-gray-700">
            Browse events, select your preferred one, choose seats in real-time,
            complete payment, and instantly receive your e-ticket with a QR code 
            via email.
          </div>
        </div>

        {/* Q2 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            Can I cancel or refund my ticket?
          </div>
          <div className="collapse-content text-gray-700">
            Yes, you can cancel from your User Dashboard. Refunds are processed
            automatically as per the event organizer’s refund policy.
          </div>
        </div>

        {/* Q3 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            Is my payment secure?
          </div>
          <div className="collapse-content text-gray-700">
            Absolutely. We use SSL/TLS encryption and trusted gateways like Stripe
            and PayPal to ensure safe and secure transactions.
          </div>
        </div>

        {/* Q4 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            Can I book tickets for multiple people?
          </div>
          <div className="collapse-content text-gray-700">
            Yes, group bookings are supported, and you can assign tickets to
            multiple attendees during checkout.
          </div>
        </div>

        {/* Q5 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            What if I don’t receive my ticket?
          </div>
          <div className="collapse-content text-gray-700">
            Check your spam folder first. If not found, visit User Dashboard →
            Bookings to download your ticket again.
          </div>
        </div>

        {/* Q6 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            How do organizers manage their events?
          </div>
          <div className="collapse-content text-gray-700">
            Organizers have a dedicated dashboard to create events, manage ticket
            inventory, view bookings, and issue refunds.
          </div>
        </div>

        {/* Q7 */}
        <div className="collapse collapse-plus bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-semibold">
            Do I need an account to book tickets?
          </div>
          <div className="collapse-content text-gray-700">
            Yes, an account is required to manage bookings, receive reminders, and
            download e-tickets anytime.
          </div>
        </div>
      </div>
    </section>
  )
}
