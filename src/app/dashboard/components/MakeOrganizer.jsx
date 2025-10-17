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
       toast.success('✅ User promoted to Organizer');
      } else {
        alert("❌ Failed to update role");
      }
    } catch (err) {
      console.error("Error updating user role:", err);
    }
  };

  if (loading) return <Loader></Loader>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">List of All Users</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-md text-white ${
                      user.role === "Organizer" ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleMakeOrganizer(user._id)}
                      className="btn btn-sm bg-[#d96c2c] hover:bg-[#c65a1e] text-white"
                    >
                      Make Organizer
                    </button>
                  ) : (
                    <button className="btn btn-sm bg-green-500 text-white cursor-not-allowed">
                      Organizer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
