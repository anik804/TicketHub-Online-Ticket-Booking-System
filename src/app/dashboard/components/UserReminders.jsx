"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Bell,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Mail,
  Trash2,
  Clock,
} from "lucide-react";
import Loader from "./shared/Loader";

export default function UserNotifications() {
  const { data: session } = useSession();
  const [reminders, setReminders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, reminders, updates

  useEffect(() => {
    if (session?.user?.email) {
      fetchAllNotifications();
    }
  }, [session]);

  const fetchAllNotifications = async () => {
    try {
      // Fetch reminders from your existing API
      const remindersRes = await fetch("/api/reminders");
      const remindersData = await remindersRes.json();

      // Filter reminders for current user
      const userReminders = remindersData.filter(
        (r) => r.email === session.user.email
      );

      // Fetch other notifications (cancellations, refunds, etc.)
      const notifRes = await fetch(
        `/api/notifications?email=${session.user.email}`
      );
      const notifData = await notifRes.json();

      setReminders(userReminders);
      setNotifications(notifData);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReminder = async (reminderId) => {
    try {
      await fetch(`/api/reminders/${reminderId}`, {
        method: "DELETE",
      });
      setReminders((prev) => prev.filter((r) => r._id !== reminderId));
    } catch (error) {
      console.error("Failed to delete reminder:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Combine and sort all items by date
  const allItems = [
    ...reminders.map((r) => ({ ...r, itemType: "reminder" })),
    ...notifications.map((n) => ({ ...n, itemType: "notification" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filteredItems = allItems.filter((item) => {
    if (filter === "reminders") return item.itemType === "reminder";
    if (filter === "updates") return item.itemType === "notification";
    return true;
  });

  const totalCount = allItems.length;
  const reminderCount = reminders.length;
  const updateCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
       <Loader></Loader>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-accent lg:text-4xl">
              Notifications & Reminders
            </h2>
            <p className="mt-2 text-sm text-base-content/70">
              Stay updated with your event reminders and important updates
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="badge badge-primary badge-lg gap-2 px-4 py-4">
              <Bell className="h-4 w-4" />
              {unreadCount} new
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4"
      >
        <div className="stats bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Bell className="h-8 w-8" />
            </div>
            <div className="stat-title font-semibold">Total</div>
            <div className="stat-value text-primary">{totalCount}</div>
            <div className="stat-desc">All items</div>
          </div>
        </div>

        <div className="stats bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Calendar className="h-8 w-8" />
            </div>
            <div className="stat-title font-semibold">Reminders</div>
            <div className="stat-value text-secondary">{reminderCount}</div>
            <div className="stat-desc">Event reminders</div>
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
        <div className="tab gap-7 tabs-boxed bg-base-100 shadow-lg">
          <button
            className={`tab gap-2 ${filter === "all" ? "tab-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            <Bell className="h-4 w-4" />
            All
          </button>
          <button
            className={`tab gap-2 ${
              filter === "reminders" ? "tab-active" : ""
            }`}
            onClick={() => setFilter("reminders")}
          >
            <Calendar className="h-4 w-4" />
            Reminders
          </button>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) =>
              item.itemType === "reminder" ? (
                <ReminderCard
                  key={item._id}
                  reminder={item}
                  index={index}
                  onDelete={deleteReminder}
                />
              ) : (
                <NotificationCard
                  key={item._id}
                  notification={item}
                  index={index}
                  onDelete={deleteNotification}
                />
              )
            )
          ) : (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body py-16 text-center">
                <Bell className="mx-auto h-16 w-16 text-base-content/20" />
                <p className="mt-4 text-lg font-semibold text-base-content/50">
                  No {filter !== "all" ? filter : "notifications"} found
                </p>
                <p className="text-sm text-base-content/30">
                  Your {filter !== "all" ? filter : "notifications"} will appear
                  here
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Reminder Card Component
function ReminderCard({ reminder, index, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className="card border border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg"
    >
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          {/* Icon and Content */}
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary">
              <Calendar className="h-6 w-6" />
            </div>

            <div className="flex-1">
              {/* Title */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-accent">
                  Event Reminder
                </h3>
                <span className="badge badge-secondary badge-sm">
                  {reminder.status}
                </span>
              </div>

              {/* Event Name */}
              <p className="mt-2 text-base font-semibold text-base-content">
                {reminder.eventName}
              </p>

              {/* Event Date */}
              <div className="mt-3 rounded-lg bg-base-100/50 p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-base-content/60" />
                  <span className="text-sm text-base-content/60">
                    Event Date:
                  </span>
                  <span className="text-sm font-medium text-accent">
                    {new Date(reminder.date).toLocaleDateString("en-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {/* Description Display - NEW */}
                {reminder.description && (
                  <div className="mt-3 border-t border-base-300 pt-3">
                    <p className="text-xs font-semibold text-base-content/70 mb-1">
                      Event Details:
                    </p>
                    <p className="text-sm text-base-content/80 leading-relaxed">
                      {reminder.description}
                    </p>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-base-content/60" />
                  <span className="text-xs text-base-content/60">
                    Sent to: {reminder.email}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <p className="mt-3 text-xs text-base-content/50">
                Created on:{" "}
                {new Date(reminder.createdAt).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(reminder._id)}
            className="btn btn-ghost btn-sm gap-2 text-error"
            title="Delete reminder"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Notification Card Component
function NotificationCard({ notification, index, onDelete }) {
  const getIcon = (type) => {
    switch (type) {
      case "cancellation":
        return <XCircle className="h-6 w-6" />;
      case "refund":
        return <CreditCard className="h-6 w-6" />;
      case "confirmation":
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <AlertCircle className="h-6 w-6" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "cancellation":
        return "from-error/10 to-error/5 text-error border-error/30";
      case "refund":
        return "from-success/10 to-success/5 text-success border-success/30";
      case "confirmation":
        return "from-info/10 to-info/5 text-info border-info/30";
      default:
        return "from-warning/10 to-warning/5 text-warning border-warning/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className={`card border bg-gradient-to-br shadow-lg ${getTypeColor(
        notification.type
      )} ${!notification.isRead ? "ring-2 ring-primary" : ""}`}
    >
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          {/* Icon and Content */}
          <div className="flex gap-4">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getTypeColor(
                notification.type
              )}`}
            >
              {getIcon(notification.type)}
            </div>

            <div className="flex-1">
              {/* Title */}
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-accent">
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <span className="badge badge-primary badge-sm">New</span>
                )}
              </div>

              {/* Message */}
              <p className="mt-2 text-sm text-base-content/80">
                {notification.message}
              </p>

              {/* Event Details */}
              {notification.eventDetails && (
                <div className="mt-4 space-y-2 rounded-lg bg-base-100/50 p-3">
                  {notification.eventDetails.eventName && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-base-content/60" />
                      <span className="text-sm font-semibold">
                        {notification.eventDetails.eventName}
                      </span>
                    </div>
                  )}
                  {notification.eventDetails.eventDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-base-content/60">
                        Event Date:
                      </span>
                      <span className="text-xs font-medium">
                        {new Date(
                          notification.eventDetails.eventDate
                        ).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                  {notification.eventDetails.cancellationDate && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-base-content/60">
                        Cancelled On:
                      </span>
                      <span className="text-xs font-medium">
                        {new Date(
                          notification.eventDetails.cancellationDate
                        ).toLocaleDateString("en-BD", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                  {notification.eventDetails.refundAmount && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-success" />
                      <span className="text-sm font-bold text-success">
                        Refund: {notification.eventDetails.currency}{" "}
                        {notification.eventDetails.refundAmount}
                      </span>
                    </div>
                  )}
                  {notification.eventDetails.refundStatus && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-base-content/60">
                        Status:
                      </span>
                      <span className="badge badge-success badge-sm">
                        {notification.eventDetails.refundStatus}
                      </span>
                    </div>
                  )}
                  {notification.eventDetails.supportContact && (
                    <div className="mt-2 flex items-center gap-2 border-t border-base-300 pt-2">
                      <Mail className="h-4 w-4 text-base-content/60" />
                      <span className="text-xs text-base-content/60">
                        Support:
                      </span>
                      <a
                        href={`mailto:${notification.eventDetails.supportContact}`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        {notification.eventDetails.supportContact}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Timestamp */}
              <p className="mt-3 text-xs text-base-content/50">
                {new Date(notification.createdAt).toLocaleString("en-BD", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(notification._id)}
            className="btn btn-ghost btn-sm gap-2 text-error"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
