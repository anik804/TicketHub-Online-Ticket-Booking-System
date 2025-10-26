"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DashboardSection from "../../components/shared/DashboardSection";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [loading, setLoading] = useState(false);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">
          Please log in to view your profile.
        </h1>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, name, image }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile updated successfully ✅");

        // Force session update for all components (Navbar)
        await signIn("credentials", {
          redirect: false,
          email: session.user.email,
          password: "", // keep empty since we just need to refresh session
        });
      } else {
        toast.error(data.error || "Failed to update profile ❌");
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardSection title="Profile">
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <Toaster position="top-center" />
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={image || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-red-500"
          />
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Profile Photo URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
    </DashboardSection>
  );
}
