import React from "react";

export default function PageLayout({ children, title }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 text-gray-900 dark:text-gray-100 px-6 py-16 flex justify-center">
      <div className="max-w-4xl w-full bg-orange-50 dark:bg-gray-800 shadow-2xl rounded-3xl border border-orange-200 dark:border-gray-700 p-12">
        {/* Main Title */}
        <h1
          className="text-5xl font-extrabold text-center mb-12 
             bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] 
             dark:from-red-400 dark:via-orange-300 dark:to-yellow-300
             bg-clip-text text-transparent"
        >
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
