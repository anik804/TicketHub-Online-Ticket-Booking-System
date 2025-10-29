"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./shared/Loader";
import toast from "react-hot-toast";

export default function MakeOrganizer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Promote user to Organizer
  const handleMakeOrganizer = async (id) => {
    try {
      const res = await fetch(`/api/admin/make-organizer/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: "Organizer" } : user
          )
        );
        toast.success("✅ User promoted to Organizer");
      } else {
        toast.error("❌ Failed to update role");
      }
    } catch (err) {
      console.error("Error updating user role:", err);
      toast.error("❌ An error occurred");
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-accent lg:text-4xl"
        >
          User Management Dashboard
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm text-base-content/70"
        >
          Manage user roles and permissions efficiently
        </motion.p>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="stats bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
            <div className="stat-desc">All registered users</div>
          </div>
        </div>

        <div className="stats bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Organizers</div>
            <div className="stat-value text-secondary">
              {users.filter((u) => u.role === "Organizer").length}
            </div>
            <div className="stat-desc">Active organizers</div>
          </div>
        </div>

        <div className="stats bg-gradient-to-br from-accent/10 to-accent/5 shadow-lg">
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="stat-title font-semibold">Regular Users</div>
            <div className="stat-value text-accent">
              {users.filter((u) => u.role === "user").length}
            </div>
            <div className="stat-desc">Standard access</div>
          </div>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-base-100 shadow-2xl"
      >
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table Header */}
              <thead>
                <tr className="border-b-2 border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <th className="text-left text-base font-bold">No.</th>
                  <th className="text-base font-bold">User</th>
                  <th className="text-base font-bold">Email</th>
                  <th className="text-center text-base font-bold">Role</th>
                  <th className="text-center text-base font-bold">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-base-200 transition-all duration-200 hover:bg-base-200/50"
                  >
                    <td className="text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {i + 1}
                      </div>
                    </td>

                    {/* User Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                            <img
                              src={user.photo || "/default-avatar.png"}
                              alt={user.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-accent">
                            {user.name}
                          </div>
                          <div className="text-xs text-base-content/50">
                            ID: {user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <div className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-base-content/40"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="text-center">
                      {user.role === "Organizer" ? (
                        <div className="badge badge-success gap-2 px-4 py-3 font-semibold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Organizer
                        </div>
                      ) : (
                        <div className="badge badge-ghost gap-2 px-4 py-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          User
                        </div>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="text-center">
                      {user.role === "user" ? (
                        <button
                          onClick={() => handleMakeOrganizer(user._id)}
                          className="btn btn-primary btn-sm gap-2 transition-all duration-200 hover:scale-105"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                          Promote
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm gap-2"
                          disabled
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Active
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-base-content/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="mt-4 text-lg font-semibold text-base-content/50">
                No users found
              </p>
              <p className="text-sm text-base-content/30">
                Users will appear here once registered
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
