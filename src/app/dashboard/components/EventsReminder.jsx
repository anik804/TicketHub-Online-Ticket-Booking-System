"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone } from "lucide-react";

export default function EventsReminder() {
  const [reminders, setReminders] = useState([]);
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");

  const handleSendReminder = (e) => {
    e.preventDefault();

    const newReminder = {
      id: Date.now(),
      email,
      eventName,
      date,
      status: "Sent ✅",
    };

    setReminders([newReminder, ...reminders]);
    setEmail("");
    setEventName("");
    setDate("");
  };

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🔔 Event Reminder Notifications
      </motion.h1>

      {/* Reminder Form */}
      <motion.form
        onSubmit={handleSendReminder}
        className="bg-white shadow-lg rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <input
          type="text"
          placeholder="Event Name"
          className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="User Email"
          className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="date"
          className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="md:col-span-3 btn bg-gradient-to-r from-[#950101] to-[#FF0000] text-white 
                           px-6 py-3 rounded-xl font-semibold text-lg shadow-md 
                           transition-all duration-300 hover:scale-105"
        >
          Send Reminder
        </button>
      </motion.form>

      {/* Notifications Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
        {reminders.length === 0 ? (
          <p className="text-gray-600 text-center">
            No reminders sent yet. Add one above.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">📅 Event</th>
                <th className="p-3">📧 Email</th>
                <th className="p-3">🗓 Date</th>
                <th className="p-3">✅ Status</th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr
                  key={reminder.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{reminder.eventName}</td>
                  <td className="p-3">{reminder.email}</td>
                  <td className="p-3">{reminder.date}</td>
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
        className="text-center space-y-2 text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="flex justify-center items-center gap-2">
          <Mail className="text-red-500" /> Email notifications are sent
          instantly
        </p>
        <p className="flex justify-center items-center gap-2">
          <Smartphone className="text-orange-500" /> SMS & Push notifications
          supported
        </p>
        <p className="flex justify-center items-center gap-2">
          <Bell className="text-yellow-500" /> Automatic reminder on event day
        </p>
      </motion.div>
    </section>
  );
}
