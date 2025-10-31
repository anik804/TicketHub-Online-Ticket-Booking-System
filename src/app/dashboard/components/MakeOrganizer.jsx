"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  User,
  Mail,
  ArrowUp,
  CheckCircle,
  Search,
} from "lucide-react";
import Loader from "./shared/Loader";
import toast from "react-hot-toast";

export default function MakeOrganizer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen  p-4 sm:p-6 lg:p-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold text-primary lg:text-4xl">
           User Management Dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage user roles and permissions efficiently
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <motion.div
          variants={itemVariants}
          className="stats bg-base-200 shadow-lg"
        >
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.length}</div>
            <div className="stat-desc">All registered users</div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stats bg-base-200 shadow-lg"
        >
          <div className="stat">
            <div className="stat-figure text-secondary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div className="stat-title">Organizers</div>
            <div className="stat-value text-secondary">
              {users.filter((u) => u.role === "Organizer").length}
            </div>
            <div className="stat-desc">Active organizers</div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="stats bg-base-200 shadow-lg"
        >
          <div className="stat">
            <div className="stat-figure text-accent">
              <User className="h-8 w-8" />
            </div>
            <div className="stat-title">Regular Users</div>
            <div className="stat-value text-accent">
              {users.filter((u) => u.role === "user").length}
            </div>
            <div className="stat-desc">Standard access</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="form-control">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="input input-bordered bg-base-200 text-base-content focus:border-primary focus:outline-none w-full pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/40" />
          </div>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        variants={itemVariants}
        className="card border border-base-300 bg-base-100 shadow-2xl"
      >
        <div className="card-body p-0">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="table">
              {/* Table Header */}
              <thead>
                <tr className="border-b-2 border-base-300 bg-base-200">
                  <th className="text-center text-base font-bold text-base-content">
                    No.
                  </th>
                  <th className="text-base font-bold text-base-content">
                    User
                  </th>
                  <th className="text-base font-bold text-base-content">
                    Email
                  </th>
                  <th className="text-center text-base font-bold text-base-content">
                    Role
                  </th>
                  <th className="text-center text-base font-bold text-base-content">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-base-300 hover:bg-base-200/50"
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
                        <Mail className="h-4 w-4 text-base-content/40" />
                        <span className="text-sm text-base-content">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="text-center">
                      {user.role === "Organizer" ? (
                        <div className="badge badge-success gap-2 px-4 py-3 font-semibold">
                          <CheckCircle className="h-4 w-4" />
                          Organizer
                        </div>
                      ) : (
                        <div className="badge badge-ghost gap-2 px-4 py-3">
                          <User className="h-4 w-4" />
                          User
                        </div>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="text-center">
                      {user.role === "user" ? (
                        <button
                          onClick={() => handleMakeOrganizer(user._id)}
                          className="btn btn-primary btn-sm gap-2 text-white transition-all duration-200 hover:scale-105"
                        >
                          <ArrowUp className="h-4 w-4" />
                          Promote
                        </button>
                      ) : (
                        <button className="btn btn-success btn-sm gap-2" disabled>
                          <CheckCircle className="h-4 w-4" />
                          Active
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 p-4 lg:hidden">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card border border-base-300 bg-base-200 shadow-md"
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 ring-2 ring-primary/20">
                          <img
                            src={user.photo || "/default-avatar.png"}
                            alt={user.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-accent">{user.name}</p>
                        <p className="text-xs text-base-content/50">
                          {user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                    {user.role === "Organizer" ? (
                      <span className="badge badge-success badge-sm">
                        Organizer
                      </span>
                    ) : (
                      <span className="badge badge-ghost badge-sm">User</span>
                    )}
                  </div>

                  <div className="divider my-2"></div>

                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-base-content/60" />
                    <span className="text-sm text-base-content">
                      {user.email}
                    </span>
                  </div>

                  {/* Action Button */}
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleMakeOrganizer(user._id)}
                      className="btn btn-primary btn-sm mt-3 w-full gap-2 text-white"
                    >
                      <ArrowUp className="h-4 w-4" />
                      Promote to Organizer
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm mt-3 w-full gap-2"
                      disabled
                    >
                      <CheckCircle className="h-4 w-4" />
                      Already Organizer
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="py-16 text-center">
              <Users className="mx-auto h-16 w-16 text-base-content/20" />
              <p className="mt-4 text-lg font-semibold text-base-content/50">
                No users found
              </p>
              <p className="text-sm text-base-content/30">
                {searchTerm
                  ? "Try adjusting your search"
                  : "Users will appear here once registered"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Summary Footer */}
      {filteredUsers.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="mt-6 rounded-xl border border-base-300 bg-base-200 p-4 shadow-lg"
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-base-content/70">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-base-content">
                Promotion Rate:
              </span>
              <span className="text-lg font-bold text-primary">
                {(
                  (users.filter((u) => u.role === "Organizer").length /
                    users.length) *
                    100 || 0
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
