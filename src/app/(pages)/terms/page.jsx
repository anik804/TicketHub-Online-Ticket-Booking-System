"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
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

      <div className="bg-white text-gray-900 dark:bg-black dark:text-gray-100">

        {/* Banner Section */}
        <div
          className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center mt-[-80px]"
          style={{
            backgroundImage: "url('/terms.jpg')", // replace with your banner image
          }}
        >
          {/* Dark blur overlay */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[5px]"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-gray-300 mb-2">Home / Terms & Conditions</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Terms & Conditions
            </h1>
          </motion.div>
        </div>

        {/* Full-width dotted divider under banner */}
        <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

        {/* Terms Content Section */}
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <p className="text-[#d96c2c] uppercase font-semibold">
            Please Read Carefully
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            TicketHub Terms & Conditions
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 p-10 rounded-2xl text-left space-y-10"
          >
            {/* Intro */}
            <div>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Welcome to{" "}
                <span className="font-semibold text-[#d96c2c]">TicketHub</span> — 
                your trusted platform for online ticket reservations. By using our 
                services, you agree to comply with the following Terms & Conditions.
              </p>
              <p className="mt-3 text-sm font-semibold text-[#d96c2c]">
                Effective Date: September 18, 2025
              </p>
            </div>

            {/* Sections */}
            {sections.map((section, idx) => (
              <div key={idx} className="border-l-4 pl-6 border-[#d96c2c]">
                <div className="flex items-center gap-3 mb-3">
                  {section.icon}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {section.body}
                </p>
                {section.note && (
                  <p className="mt-2 text-sm font-semibold text-[#d96c2c]">
                    {section.note}
                  </p>
                )}
              </div>
            ))}

            {/* Footer */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold text-[#d96c2c]">TicketHub</span>. All Rights Reserved.
              </p>
              <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                By continuing to use this platform, you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline text-gray-900 dark:text-gray-100 hover:text-[#d96c2c] transition-colors"
                >
                  Privacy Policy
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
