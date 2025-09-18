"use client";

import Head from "next/head";
import { FileText, CheckCircle, CreditCard, Ban, Shield } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "1. Account Registration",
      body: "When creating an account, you must provide complete, accurate, and up-to-date information. You are solely responsible for safeguarding your login credentials and for all activities that occur under your account.",
      icon: <FileText className="w-6 h-6 text-[#950101] dark:text-red-400" />,
    },
    {
      title: "2. Booking & Payments",
      body: "All bookings are subject to real-time availability. Payments are securely processed through verified third-party payment gateways. TicketHub does not assume liability for any technical issues, delays, or errors originating from external payment providers.",
      icon: <CreditCard className="w-6 h-6 text-[#950101] dark:text-red-400" />,
    },
    {
      title: "3. Cancellations & Refunds",
      body: "Cancellation and refund eligibility is determined by the respective event organizer or service provider. Please review the event’s specific policy before confirming a booking.",
      note: "⚠ Please note: Service fees and convenience charges are strictly non-refundable.",
      icon: <Ban className="w-6 h-6 text-[#950101] dark:text-red-400" />,
    },
    {
      title: "4. User Responsibilities",
      body: "You agree not to misuse the TicketHub platform for fraudulent, illegal, or harmful purposes. Any violation may result in suspension or permanent termination of your account without prior notice.",
      icon: <CheckCircle className="w-6 h-6 text-[#950101] dark:text-red-400" />,
    },
    {
      title: "5. Limitation of Liability",
      body: "To the maximum extent permitted by law, TicketHub shall not be held responsible for any indirect, incidental, or consequential losses resulting from your use of our platform or services.",
      icon: <Shield className="w-6 h-6 text-[#950101] dark:text-red-400" />,
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
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-orange-50 dark:bg-gray-800 shadow-2xl rounded-3xl p-12 border border-orange-200 dark:border-gray-700">
          
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight 
                           bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] 
                           dark:from-orange-200 dark:via-red-400 dark:to-yellow-300
                           bg-clip-text text-transparent">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm uppercase tracking-wide font-semibold text-[#950101] dark:text-red-400">
              Effective Date: September 18, 2025
            </p>
            <p className="mt-5 text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              Welcome to <span className="text-[#950101] dark:text-red-400 font-semibold">TicketHub</span> — your trusted platform for online ticket reservations.  
              By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
            </p>
          </header>

          {/* Sections */}
          <section className="space-y-12">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className="border-l-4 pl-6 md:pl-8 border-[#950101] dark:border-red-400"
              >
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-[#3D0000] dark:text-orange-200">
                    {section.title}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
                  {section.body}
                </p>
                {section.note && (
                  <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-400">
                    {section.note}
                  </p>
                )}
              </div>
            ))}
          </section>

          {/* Footer */}
          <footer className="mt-16 text-center border-t border-gray-300 dark:border-gray-600 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-[#950101] dark:text-red-400 font-semibold">TicketHub</span>. All Rights Reserved.
            </p>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              By continuing to use this platform, you agree to our{" "}
              <a href="/privacy" className="underline text-[#3D0000] dark:text-orange-200 hover:text-[#950101] dark:hover:text-red-400">
                Privacy Policy
              </a>.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
