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
      <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a0a] text-gray-200">
        <h1 className="text-2xl font-semibold">
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

        await signIn("credentials", {
          redirect: false,
          email: session.user.email,
          password: "",
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
    <DashboardSection title="My Profile">
      <div className="min-h-screen w-full bg-gradient-to-b text-white py-10 px-4">
        <Toaster position="top-center" />
        <div className="max-w-3xl mx-auto bg-[#1b1b1b] border border-[#333] rounded-2xl shadow-lg p-8 w-full">

          <div className="flex flex-col items-center mb-8">
            <img
              src={image || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-orange-500 shadow-md object-cover"
            />
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-6">
            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#222] border border-[#444] text-white focus:outline-none focus:border-orange-500 transition"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-medium">
                Profile Photo URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#222] border border-[#444] text-white focus:outline-none focus:border-orange-500 transition"
                placeholder="Paste image URL"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-orange-600/40 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </DashboardSection>
  );
}
