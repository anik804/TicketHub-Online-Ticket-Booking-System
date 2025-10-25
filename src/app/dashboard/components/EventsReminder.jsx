"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone } from "lucide-react";

export default function EventsReminder() {
  const [reminders, setReminders] = useState([]);
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");

  const handleSendReminder = async (e) => {
    e.preventDefault();

    const newReminder = { email, eventName, date, status: "Sent ✅" };

    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReminder),
    });

    if (res.ok) {
      const saved = await res.json();
      setReminders([saved, ...reminders]);
    }

    setEmail("");
    setEventName("");
    setDate("");
  };

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-12 space-y-10 bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl">
      {/* Title */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold  drop-shadow-sm">
          Event Reminder Notifications
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schedule reminders for your upcoming events. We’ll notify you via
          email, SMS, or push alerts instantly.
        </p>
      </motion.div>

      {/* Reminder Form */}
      <motion.form
        onSubmit={handleSendReminder}
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Event Name</label>
          <input
            type="text"
            placeholder=" e.g. Music Fest"
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder=" your@email.com"
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Event Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn bg-[#d96c2c] hover:bg-[#b45721] text-white 
                     px-6 py-3 rounded-xl font-semibold text-lg shadow-md mb-1 
                     transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          Send Reminder
        </button>
      </motion.form>

      {/* Notifications Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto border border-gray-100">
        {reminders.length === 0 ? (
          <p className="text-gray-500 text-center py-4 italic">
            No reminders yet — create one above
          </p>
        ) : (
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#d96c2c]/10 text-[#d96c2c] font-semibold">
                <th className="p-3"> Event</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-t border-gray-200 hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-medium text-gray-800">
                    {reminder.eventName}
                  </td>
                  <td className="p-3 text-gray-700">{reminder.email}</td>
                  <td className="p-3 text-gray-600">{reminder.date}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    {reminder.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Info Section */}
      <motion.div
        className="text-center bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="flex justify-center items-center gap-2 text-gray-700">
          <Mail className="text-[#d96c2c]" /> Instant Email notifications
        </p>
        <p className="flex justify-center items-center gap-2 text-gray-700">
          <Smartphone className="text-[#d96c2c]" /> SMS & Push alerts supported
        </p>
        <p className="flex justify-center items-center gap-2 text-gray-700">
          <Bell className="text-[#d96c2c]" /> Automatic reminder on event day
        </p>
      </motion.div>
    </section>
  );
}
