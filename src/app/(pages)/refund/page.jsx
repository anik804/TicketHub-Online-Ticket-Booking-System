"use client";

import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16 flex justify-center">
      <div className="max-w-4xl w-full bg-orange-50 dark:bg-gray-800 shadow-2xl rounded-3xl border border-orange-200 dark:border-gray-700 p-12">

        {/* Main Title */}
        <h1
  className="text-5xl font-extrabold text-center mb-12 
             bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] 
             dark:from-red-400 dark:via-orange-300 dark:to-yellow-300
             bg-clip-text text-transparent"
>
  Refund Policy
</h1>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold mb-3 text-[#3D0000] dark:text-red-300">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#950101] dark:bg-orange-300 text-white dark:text-black mr-3 font-semibold text-base">
              1
            </span>
            Ticket Cancellation
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Users can cancel their tickets directly through their dashboard 
            before the event starts. Once cancellation is approved, the ticket 
            will no longer be valid for entry.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold mb-3 text-[#3D0000] dark:text-red-300">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#950101] dark:bg-orange-300 text-white dark:text-black mr-3 font-semibold text-base">
              2
            </span>
            Refund Eligibility
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300">
            <li>Full refund if cancellation is made 48+ hours before event.</li>
            <li>50% refund if cancellation is within 24–48 hours.</li>
            <li>No refund if cancellation is less than 24 hours before event.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold mb-3 text-[#3D0000] dark:text-red-300">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#950101] dark:bg-orange-300 text-white dark:text-black mr-3 font-semibold text-base">
              3
            </span>
            Refund Processing
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Refunds will be processed through the original payment method 
            (Stripe, PayPal, or Local Gateway). Processing time may vary 
            between 5–10 business days depending on the provider.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="flex items-center text-2xl font-bold mb-3 text-[#3D0000] dark:text-red-300">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#950101] dark:bg-orange-300 text-white dark:text-black mr-3 font-semibold text-base">
              4
            </span>
            Exceptions
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Refunds will not be provided for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300 mt-2">
            <li>Missed events due to personal reasons.</li>
            <li>Tickets purchased via third-party vendors.</li>
            <li>Force majeure events (natural disasters, strikes, etc.).</li>
          </ul>
        </section>

        {/* Footer Note */}
        <div className="mt-12 text-center border-t border-gray-300 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            For further assistance regarding refunds, please contact{" "}
            <span className="font-semibold text-[#950101] dark:text-orange-300">
              support@tickethub.com
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
