"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, CalendarDays } from "lucide-react";

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
    <section className="max-w-6xl mx-auto p-6 md:p-12 space-y-10">
      {/* Banner Header */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#d96c2c] to-[#b45721] text-white py-14 px-8 md:px-16 shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1515165562835-c3b8c7a866b9?w=1200&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Stay Ahead — Event Reminder System
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Never miss an event again! Schedule automatic reminders via Email, SMS, or Push Notifications.
          </p>
        </div>
      </motion.div>

      {/* Form + Info Section */}
      <motion.div
        className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Form Section */}
        <form
          onSubmit={handleSendReminder}
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 items-end"
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Event Name</label>
            <input
              type="text"
              placeholder="e.g. Music Fest"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-gray-700 font-semibold">Event Date</label>
            <input
              type="date"
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#d96c2c] focus:border-[#d96c2c] transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-[#d96c2c] hover:bg-[#b45721] text-white 
                         rounded-xl font-semibold text-lg shadow-md hover:shadow-lg 
                         transition-all duration-300 hover:scale-[1.03]"
            >
              Send Reminder
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="bg-[#fff8f4] border border-[#f3d5c1] rounded-2xl p-6 space-y-4 text-gray-700 shadow-sm">
          <h2 className="text-xl font-bold flex items-center gap-2 text-[#d96c2c]">
            <Bell /> Reminder Options
          </h2>
          <p className="flex items-center gap-2">
            <Mail className="text-[#d96c2c]" /> Instant Email Notifications
          </p>
          <p className="flex items-center gap-2">
            <Smartphone className="text-[#d96c2c]" /> SMS & Push Alerts Supported
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="text-[#d96c2c]" /> Auto Reminders on Event Day
          </p>
          <p className="text-sm text-gray-600 pt-2">
            Upcoming: AI-powered schedule detection and multi-channel alerts.
          </p>
        </div>
      </motion.div>

      {/* Reminders Table */}
      <motion.div
        className="bg-white shadow-xl rounded-3xl p-6 border border-gray-100 overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#d96c2c]"> Scheduled Reminders</h2>
        {reminders.length === 0 ? (
          <p className="text-gray-500 text-center py-6 italic">
            No reminders yet — schedule one above.
          </p>
        ) : (
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#d96c2c]/10 text-[#d96c2c] font-semibold">
                <th className="p-3">Event</th>
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
      </motion.div>
    </section>
  );
}
