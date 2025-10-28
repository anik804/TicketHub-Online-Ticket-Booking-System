"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RefundPolicy() {
  return (
    <div className="bg-base-100">

      {/* Banner Section */}
      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col items-center justify-center text-center mt-[-80px]"
        style={{
          backgroundImage: "url('/refund.jpg')", // You can replace with your banner image
        }}
      >
        {/* Dark blur overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-gray-300 mb-2">Home / Refund Policy</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Refund Policy
          </h1>
        </motion.div>
      </div>

      {/* Full-width dotted divider under banner */}
      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>

      {/* Refund Policy Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-[#d96c2c] uppercase font-semibold">Policy Details</p>
        <h2 className="text-3xl  md:text-4xl font-bold mb-12">
          TicketHub Refund Policy
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto   bg-base-100 shadow-lg border border-gray-200 dark:border-gray-700 p-10 rounded-2xl text-left space-y-10"
        >
          {/* Section 1 */}
          <section >
            <h3 className="text-2xl font-semibold mb-3 text-[#d96c2c]">
              1. Ticket Cancellation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Users can cancel their tickets directly through their dashboard
              before the event starts. Once cancellation is approved, the ticket
              will no longer be valid for entry.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="text-2xl font-semibold mb-3 text-[#d96c2c]">
              2. Refund Eligibility
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed">
              <li>Full refund if cancellation is made 48+ hours before event.</li>
              <li>50% refund if cancellation is within 24–48 hours.</li>
              <li>No refund if cancellation is less than 24 hours before event.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h3 className="text-2xl font-semibold mb-3 text-[#d96c2c]">
              3. Refund Processing
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Refunds will be processed through the original payment method
              (Stripe, PayPal, or Local Gateway). Processing time may vary
              between 5–10 business days depending on the provider.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h3 className="text-2xl font-semibold mb-3 text-[#d96c2c]">
              4. Exceptions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Refunds will not be provided for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed mt-2">
              <li>Missed events due to personal reasons.</li>
              <li>Tickets purchased via third-party vendors.</li>
              <li>Force majeure events (natural disasters, strikes, etc.).</li>
            </ul>
          </section>

          {/* Footer Note */}
          <div className="pt-6 border-t border-gray-200  text-center">
            <p className="text-gray-600 dark:text-gray-400">
              For further assistance regarding refunds, please contact{" "}
              <span className="font-semibold text-[#d96c2c]">
                support@tickethub.com
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
