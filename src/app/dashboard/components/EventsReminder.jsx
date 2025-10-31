"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  Smartphone,
  CalendarDays,
  Send,
  Trash2,
  Users,
  CheckCircle,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

export default function EventsReminder() {
  const [reminders, setReminders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch existing reminders and users on mount
  useEffect(() => {
    fetchReminders();
    fetchUsers();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      const data = await res.json();
      setReminders(data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      toast.error("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSendReminder = async (e) => {
    e.preventDefault();
    setSending(true);

    const newReminder = {
      email: selectedEmail,
      eventName,
      date,
      description,
      status: "Sent ✅",
    };

    try {
      // 1. Save reminder to reminders collection
      const reminderRes = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReminder),
      });

      if (reminderRes.ok) {
        const savedReminder = await reminderRes.json();
        setReminders([savedReminder, ...reminders]);

        // 2. Create notification for the user
        const notificationRes = await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: selectedEmail,
            type: "reminder",
            title: `Event Reminder: ${eventName}`,
            message: description
              ? `You have an upcoming event "${eventName}" on ${new Date(
                  date
                ).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}. ${description}`
              : `You have an upcoming event "${eventName}" scheduled on ${new Date(
                  date
                ).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}.`,
            eventDetails: {
              eventName,
              eventDate: date,
              description: description || null,
            },
          }),
        });

        if (notificationRes.ok) {
          toast.success("✅ Reminder sent and notification created!");
        } else {
          toast.success("✅ Reminder sent!");
          toast.error("⚠️ Failed to create notification");
        }

        // Reset form
        setSelectedEmail("");
        setEventName("");
        setDate("");
        setDescription("");
        setSearchTerm("");
      } else {
        toast.error("Failed to send reminder");
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      toast.error("An error occurred");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReminders(reminders.filter((r) => r._id !== id));
        toast.success("Reminder deleted");
      } else {
        toast.error("Failed to delete reminder");
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("An error occurred");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sentCount = reminders.filter((r) => r.status === "Sent ✅").length;

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
          Event Reminder System
        </h2>
        <p className="mt-2 text-sm text-base-content/70">
          Send automatic reminders to users about upcoming events
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4"
      >
        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
            <div className="stat-desc">Registered users</div>
          </div>
        </div>

        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Bell className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Reminders</div>
            <div className="stat-value text-secondary">{reminders.length}</div>
            <div className="stat-desc">All reminders sent</div>
          </div>
        </div>

        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-accent">
              <Send className="h-8 w-8" />
            </div>
            <div className="stat-title">Sent</div>
            <div className="stat-value text-accent">{sentCount}</div>
            <div className="stat-desc">Successfully delivered</div>
          </div>
        </div>

        <div className="stats bg-base-200 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-success">
              <CheckCircle className="h-8 w-8" />
            </div>
            <div className="stat-title">Recipients</div>
            <div className="stat-value text-success">
              {new Set(reminders.map((r) => r.email)).size}
            </div>
            <div className="stat-desc">Unique users notified</div>
          </div>
        </div>
      </motion.div>

      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card mb-6 overflow-hidden bg-gradient-to-r from-primary to-secondary shadow-2xl"
      >
        <div className="card-body">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Stay Ahead with Smart Reminders
              </h3>
              <p className="mt-2 text-white/90">
                Select users from your database and send personalized event
                reminders instantly!
              </p>
            </div>
            <div className="flex gap-3">
              <div className="badge badge-lg gap-2 bg-white/20 text-white border-white/40">
                <Mail className="h-4 w-4" /> Email
              </div>
              <div className="badge badge-lg gap-2 bg-white/20 text-white border-white/40">
                <Smartphone className="h-4 w-4" /> In-App
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {/* Send Reminder Form */}
        <div className="card border border-base-300 bg-base-100 shadow-xl lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title text-accent">
              <Send className="h-5 w-5" />
              Send New Reminder
            </h3>
            <div className="divider mt-0"></div>

            <form onSubmit={handleSendReminder} className="space-y-4">
              {/* Select User */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Select User
                  </span>
                  <span className="label-text-alt text-primary">
                    {users.length} users available
                  </span>
                </label>

                {/* Search Input */}
                <div className="relative mb-2">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="input input-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none w-full pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
                </div>

                {/* User Dropdown */}
                <select
                  className="select select-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    {usersLoading
                      ? "Loading users..."
                      : filteredUsers.length === 0
                      ? "No users found"
                      : "Choose a user"}
                  </option>
                  {filteredUsers.map((user) => (
                    <option key={user._id} value={user.email}>
                      {user.name} ({user.email}) - {user.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Event Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text mr-1 font-semibold text-base-content">
                      Event Name: 
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Music Festival 2025"
                    className="input input-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>

                {/* Event Date */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text mr-1 font-semibold text-base-content">
                      Event Date:
                    </span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Description Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mr-1 font-semibold text-base-content">
                    Description: 
                  </span>
                </label>
                <textarea
                  placeholder="Add event details or special instructions for the user..."
                  className="textarea textarea-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none h-24 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full gap-2 text-white"
                disabled={sending}
              >
                {sending ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Reminder & Create Notification
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="card border border-base-300 bg-base-200 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-accent">
              <Bell className="h-5 w-5" />
              How It Works
            </h3>
            <div className="divider mt-0"></div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold text-base-content">Select User</p>
                  <p className="text-sm text-base-content/60">
                    Choose from database users
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-white font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold text-base-content">Add Details</p>
                  <p className="text-sm text-base-content/60">
                    Event name, date & description
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold text-base-content">Send</p>
                  <p className="text-sm text-base-content/60">
                    User gets in-app notification
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-success/10 p-3 border border-success/20">
                <p className="text-xs text-base-content/70">
                  <strong>✅ Automatic:</strong> Notifications are created in
                  user's dashboard instantly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reminders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card border border-base-300 bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h3 className="card-title text-accent">📋 Scheduled Reminders</h3>
          <div className="divider mt-0"></div>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : reminders.length === 0 ? (
            <div className="py-16 text-center">
              <Bell className="mx-auto h-16 w-16 text-base-content/20" />
              <p className="mt-4 text-lg font-semibold text-base-content/50">
                No reminders scheduled yet
              </p>
              <p className="text-sm text-base-content/30">
                Send your first reminder using the form above
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
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
                      <th className="text-center text-base font-bold text-base-content">
                        Status
                      </th>
                      <th className="text-center text-base font-bold text-base-content">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reminders.map((reminder, index) => (
                      <motion.tr
                        key={reminder._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
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
                            <CalendarDays className="h-4 w-4 text-primary" />
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
                        </td>
                        <td className="text-center">
                          <span className="badge badge-success gap-2">
                            <CheckCircle className="h-3 w-3" />
                            {reminder.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDeleteReminder(reminder._id)}
                            className="btn btn-ghost btn-sm gap-2 text-error hover:bg-error/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {reminders.map((reminder, index) => (
                  <motion.div
                    key={reminder._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card border border-base-300 bg-base-200 shadow-md"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-base-content">
                              {reminder.eventName}
                            </p>
                            <p className="text-xs text-base-content/60">
                              {reminder.email}
                            </p>
                          </div>
                        </div>
                        <span className="badge badge-success badge-sm">
                          {reminder.status}
                        </span>
                      </div>

                      <div className="divider my-2"></div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-base-content/60">
                          Event Date:
                        </span>
                        <span className="text-sm font-medium text-base-content">
                          {new Date(reminder.date).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteReminder(reminder._id)}
                        className="btn btn-error btn-sm mt-2 w-full gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
