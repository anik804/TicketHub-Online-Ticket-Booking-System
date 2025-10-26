"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const userEmail = session?.user?.email;

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  useEffect(() => {
    if (!id) return;

    fetch(`/api/blogs/${id}`)
      .then((res) => res.json())
      .then(setBlog)
      .catch((err) => {
        console.error(err);
        showToast("Failed to load blog", "error");
      });
  }, [id]);

  const handleLike = async () => {
    if (!session) return showToast("Login to like", "error");

    try {
      const res = await fetch(`/api/blogs/${id}/like`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Like failed");

      setBlog((prev) => ({
        ...prev,
        likes: data.liked
          ? [...prev.likes, { email: userEmail, name: session.user.name }]
          : prev.likes.filter((l) => l.email !== userEmail),
      }));

      showToast(data.liked ? "Liked!" : "Unliked!");
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!session) return showToast("Login to comment", "error");
    if (!comment.trim()) return;

    try {
      const res = await fetch(`/api/blogs/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to comment");

      setBlog((prev) => ({
        ...prev,
        comments: [
          ...prev.comments,
          { user: { name: session.user.name, email: userEmail }, text: comment },
        ],
      }));
      setComment("");
      showToast("Comment added!");
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    }
  };

  if (!blog) return <div className="text-gray-900 p-10">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen p-0 flex flex-col bg-transparent text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ===== Banner Section ===== */}
      <div className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img
          src="/blogs-banner.jpg"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-300 mb-3 text-sm md:text-base tracking-wide"
          >
            Home / Blogs / {blog.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              delay: 0.3,
            }}
            className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-[4px] bg-orange-500 mt-4 mx-auto rounded-full"
          ></motion.div>
        </motion.div>
      </div>
      <div className="w-full pt-2 border-b-6 border-dashed border-black"></div>
      {/* ===== Content Section ===== */}
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-4 p-8 md:p-16">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/blogs")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="self-start bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-orange-600 transition"
        >
          ← Back to All Blogs
        </motion.button>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          {/* Image */}
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="md:w-1/2 h-80 object-cover rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          />

          {/* Content */}
          <motion.div
            className="md:w-1/2 flex flex-col gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold text-orange-500">{blog.title}</h1>
            <p className="text-gray-700">{blog.content}</p>

            {/* Like & Share */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleLike}
                className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                  blog.likes.some((l) => l.email === userEmail)
                    ? "bg-orange-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                ❤️ {blog.likes.length} {blog.likes.length === 1 ? "Like" : "Likes"}
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600 transition-all"
              >
                🔗 Share
              </button>
            </div>

            {/* Comments */}
            <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-xl mt-6 flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-orange-400">
                Comments ({blog.comments.length})
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {blog.comments.map((c, i) => (
                  <div key={i} className="border-b border-zinc-300 dark:border-zinc-700 pb-2">
                    <p className="text-orange-400 font-semibold">{c.user.name}</p>
                    <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
                  </div>
                ))}
              </div>

              {session ? (
                <form onSubmit={handleComment} className="flex gap-3 mt-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-3 rounded-lg border border-orange-500 text-gray-900 dark:text-white dark:bg-black"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 px-5 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Post
                  </button>
                </form>
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  Login to comment or like
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-10 right-10 px-6 py-3 rounded-lg shadow-lg z-50 ${
              toast.type === "success" ? "bg-orange-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
