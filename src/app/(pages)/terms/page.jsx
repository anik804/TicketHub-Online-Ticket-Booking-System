"use client";

import Head from "next/head";
import { FileText, CheckCircle, CreditCard, Ban, Shield } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "1. Account Registration",
      body: "When creating an account, you must provide complete, accurate, and up-to-date information. You are solely responsible for safeguarding your login credentials and for all activities that occur under your account.",
      icon: <FileText className="w-6 h-6 text-[#d96c2c]" />,
    },
    {
      title: "2. Booking & Payments",
      body: "All bookings are subject to real-time availability. Payments are securely processed through verified third-party payment gateways. TicketHub does not assume liability for any technical issues, delays, or errors originating from external payment providers.",
      icon: <CreditCard className="w-6 h-6 text-[#d96c2c]" />,
    },
    {
      title: "3. Cancellations & Refunds",
      body: "Cancellation and refund eligibility is determined by the respective event organizer or service provider. Please review the event’s specific policy before confirming a booking.",
      note: "⚠ Please note: Service fees and convenience charges are strictly non-refundable.",
      icon: <Ban className="w-6 h-6 text-[#d96c2c]" />,
    },
    {
      title: "4. User Responsibilities",
      body: "You agree not to misuse the TicketHub platform for fraudulent, illegal, or harmful purposes. Any violation may result in suspension or permanent termination of your account without prior notice.",
      icon: <CheckCircle className="w-6 h-6 text-[#d96c2c]" />,
    },
    {
      title: "5. Limitation of Liability",
      body: "To the maximum extent permitted by law, TicketHub shall not be held responsible for any indirect, incidental, or consequential losses resulting from your use of our platform or services.",
      icon: <Shield className="w-6 h-6 text-[#d96c2c]" />,
    },
  ];

  return (
    <>
      <Head>
        <title>TicketHub — Terms & Conditions</title>
        <meta
          name="description"
          content="Terms & Conditions for TicketHub — Online Ticket Booking System"
        />
      </Head>

      {/* Page Background */}
      <main className="min-h-screen bg-gray-100 flex items-center justify-center py-16 px-6">
        
        {/* White Card (light theme forced inside dark site) */}
        <div
          data-theme="light"
          className="max-w-4xl w-full bg-white rounded-3xl p-12 shadow-2xl border border-gray-200"
        >
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#d96c2c]">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm uppercase tracking-wide font-semibold text-[#d96c2c]">
              Effective Date: September 18, 2025
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[#808080]">
              Welcome to{" "}
              <span className="text-[#d96c2c] font-semibold">TicketHub</span> — your trusted platform for online ticket reservations.  
              By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
            </p>
          </header>

          {/* Sections */}
          <section className="space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="border-l-4 pl-6 border-[#d96c2c]">
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-[#000000]">
                    {section.title}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-[#808080]">
                  {section.body}
                </p>
                {section.note && (
                  <p className="mt-2 text-sm font-semibold text-[#d96c2c]">
                    {section.note}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* Footer */}
          <footer className="mt-16 text-center border-t border-gray-300 pt-6">
            <p className="text-sm text-[#808080]">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-[#d96c2c] font-semibold">TicketHub</span>. All Rights Reserved.
            </p>
            <p className="text-xs mt-2 text-[#808080]">
              By continuing to use this platform, you agree to our{" "}
              <a
                href="/privacy"
                className="underline text-[#000000] hover:text-[#d96c2c] transition-colors"
              >
                Privacy Policy
              </a>.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
