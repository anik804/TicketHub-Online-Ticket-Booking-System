"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/shared/Navbar";

export default function AddBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "movie",
    content: "",
    image: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tickethub");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      if (!res.ok) throw new Error("Failed to upload image");

      const imgData = await res.json();
      setForm({ ...form, image: imgData.secure_url });
      showToast("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("Image upload failed.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      showToast("Title and content required", "error");
      return;
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          authorEmail: session.user.email,
          authorName: session.user.name,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add blog");
      }

      setForm({ title: "", category: "movie", content: "", image: "" });
      showToast("Blog posted successfully!");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to submit blog", "error");
    }
  };

  if (status === "loading")
    return (
      <div className="h-screen flex items-center justify-center text-primary text-lg font-semibold">
        Checking authentication...
      </div>
    );

  return (
    <div className="min-h-screen relative">
      {/* Banner */}
      <div
        className="relative h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('/blogs-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[5px] z-0"></div>
        <div className="absolute top-0 left-0 w-full z-10">
          <Navbar transparent />
        </div>
        <motion.div
          className="relative z-10 text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-300 mb-2">Home / Blogs / Add Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Add Your Blog</h1>
        </motion.div>
      </div>

      {/* Blog Form */}
      <motion.div
        className="flex justify-center px-4 -mt-20 pb-20 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="bg-zinc-900 rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex-1 flex flex-col gap-5 p-8">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-orange-400  text-white"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
            >
              <option value="movie">Movie</option>
              <option value="sports">Sports Event</option>
              <option value="music">Music Fest</option>
              <option value="tech">Tech Fest</option>
              <option value="food">Food Fest</option>
            </select>

            <textarea
              placeholder="Content"
              rows="7"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-3 rounded border border-primary focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
            />
          </div>

          <div className="flex-1 flex flex-col gap-5 items-center justify-center p-8 bg-gray-800">
            <label className="w-full flex flex-col items-center border-2 border-dashed border-primary rounded-lg p-4 cursor-pointer hover:border-orange-400 transition">
              <span className="text-orange-400 mb-2">Upload Image</span>
              <input type="file" onChange={handleImage} className="hidden" />
              {form.image ? (
                <img
                  src={form.image}
                  alt="Preview"
                  className="rounded-md h-60 w-full object-cover mt-2"
                />
              ) : (
                <span className="text-gray-400 text-sm">No image selected</span>
              )}
            </label>

            <button
              type="submit"
              className="bg-primary w-full py-3 rounded hover:bg-orange-400 transition-all font-semibold mt-auto text-white"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-10 right-10 px-6 py-3 rounded-lg shadow-lg z-50 ${
              toast.type === "success" ? "bg-primary text-white" : "bg-red-400 text-white"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
