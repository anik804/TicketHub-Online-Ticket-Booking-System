"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import Loader from "./shared/Loader";

export default function OrganizerReminder() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, sent, upcoming

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      const data = await res.json();
      setReminders(data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter reminders
  const filteredReminders = reminders.filter((reminder) => {
    const eventDate = new Date(reminder.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates

    if (filter === "sent") return reminder.status === "Sent ✅";
    if (filter === "upcoming") return eventDate >= today; // Upcoming events
    return true; // All reminders
  });

  // Calculate stats
  const totalCount = reminders.length;
  const sentCount = reminders.filter((r) => r.status === "Sent ✅").length;
  const upcomingCount = reminders.filter(
    (r) => new Date(r.date) >= new Date().setHours(0, 0, 0, 0)
  ).length;

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-accent lg:text-4xl">
           Event Reminders For Organizers
        </h2>
        <p className="mt-2 text-sm text-base-content/70">
          View all reminders sent by Admin
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* Total Reminders */}
        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Bell className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Reminders</div>
            <div className="stat-value text-primary">{totalCount}</div>
            <div className="stat-desc">All event reminders</div>
          </div>
        </div>

        {/* Sent Reminders */}
        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="stat-title">Sent</div>
            <div className="stat-value text-secondary">{sentCount}</div>
            <div className="stat-desc">Successfully delivered</div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-accent">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="stat-title">Upcoming</div>
            <div className="stat-value text-accent">{upcomingCount}</div>
            <div className="stat-desc">Events ahead</div>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="tabs gap-7 tabs-boxed bg-base-200 shadow-lg">
          <button
            className={`tab gap-2 ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <Bell className="h-4 w-4" />
            All Reminders
          </button>
          <button
            className={`tab gap-2 ${filter === "sent" ? "tab-active" : ""}`}
            onClick={() => setFilter("sent")}
          >
            <CheckCircle className="h-4 w-4" />
            Sent
          </button>
          <button
            className={`tab gap-2 ${filter === "upcoming" ? "tab-active" : ""}`}
            onClick={() => setFilter("upcoming")}
          >
            <Calendar className="h-4 w-4" />
            Upcoming
          </button>
        </div>
      </motion.div>

      {/* Reminders Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {filteredReminders.length === 0 ? (
          // Empty State
          <div className="card border border-base-300 bg-base-100 shadow-xl">
            <div className="card-body py-16 text-center">
              <Bell className="mx-auto h-16 w-16 text-base-content/20" />
              <p className="mt-4 text-lg font-semibold text-base-content/50">
                No reminders found
              </p>
              <p className="text-sm text-base-content/30">
                {filter === "upcoming"
                  ? "No upcoming events scheduled"
                  : filter === "sent"
                  ? "No sent reminders available"
                  : "Your event reminders will appear here"}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body p-0">
                <div className="hidden overflow-x-auto lg:block">
                  <table className="table">
                    <thead>
                      <tr className="border-b-2 border-base-300 bg-base-200">
                        <th className="text-base font-bold text-base-content">
                          No.
                        </th>
                        <th className="text-base font-bold text-base-content">
                          Event Name
                        </th>
                        <th className="text-base font-bold text-base-content">
                          Recipient
                        </th>
                        <th className="text-base font-bold text-base-content">
                          Event Date
                        </th>
                        <th className="text-base font-bold text-base-content">
                          Description
                        </th>
                        <th className="text-center text-base font-bold text-base-content">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {filteredReminders.map((reminder, index) => (
                          <motion.tr
                            key={reminder._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-base-300 hover:bg-base-200/50"
                          >
                            <td>
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="font-semibold text-base-content">
                                  {reminder.eventName}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-base-content/40" />
                                <span className="text-sm text-base-content">
                                  {reminder.email}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-base-content/40" />
                                <span className="text-sm font-medium text-base-content">
                                  {new Date(reminder.date).toLocaleDateString(
                                    "en-BD",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </td>
                            <td>
                              {reminder.description ? (
                                <div className="max-w-xs">
                                  <p className="truncate text-sm text-base-content/70">
                                    {reminder.description}
                                  </p>
                                </div>
                              ) : (
                                <span className="text-sm italic text-base-content/40">
                                  No description
                                </span>
                              )}
                            </td>
                            <td className="text-center">
                              <span
                                className={`badge gap-2 ${
                                  reminder.status === "Sent ✅"
                                    ? "badge-success"
                                    : "badge-warning"
                                }`}
                              >
                                {reminder.status === "Sent ✅" && (
                                  <CheckCircle className="h-3 w-3" />
                                )}
                                {reminder.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="space-y-4 p-4 lg:hidden">
                  <AnimatePresence>
                    {filteredReminders.map((reminder, index) => (
                      <motion.div
                        key={reminder._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="card border border-base-300 bg-base-200 shadow-md"
                      >
                        <div className="card-body p-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-bold text-base-content">
                                  {reminder.eventName}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`badge badge-sm ${
                                reminder.status === "Sent ✅"
                                  ? "badge-success"
                                  : "badge-warning"
                              }`}
                            >
                              {reminder.status}
                            </span>
                          </div>

                          <div className="divider my-2"></div>

                          {/* Details */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-base-content/60" />
                              <span className="text-sm text-base-content">
                                {reminder.email}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-base-content/60" />
                              <span className="text-sm text-base-content">
                                {new Date(reminder.date).toLocaleDateString(
                                  "en-BD",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>

                            {reminder.description && (
                              <div className="mt-3 rounded-lg bg-base-100 p-3 border border-base-300">
                                <div className="flex items-start gap-2">
                                  <FileText className="h-4 w-4 text-base-content/60 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-semibold text-base-content/70 mb-1">
                                      Description:
                                    </p>
                                    <p className="text-sm text-base-content/80 leading-relaxed">
                                      {reminder.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Summary Footer */}
      {filteredReminders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-4 border border-base-300"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-base-content/70">
              Showing {filteredReminders.length} of {totalCount} reminders
              {filter === "upcoming" && " (upcoming events only)"}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-base-content">
                Total Events:
              </span>
              <span className="text-lg font-bold text-primary">
                {new Set(reminders.map((r) => r.eventName)).size}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
