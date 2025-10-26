"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function MyBlogsPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) =>
        setBlogs(data.filter((b) => b.author?.email === session.user.email))
      );
  }, [session]);

  const handleDelete = async (id) => {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  if (!session)
    return (
      <p className="text-center text-gray-400 mt-10">
        Please log in to view your blogs.
      </p>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        {session.user.name}’s Blogs
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gray-900 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-400 mt-2">{blog.content.slice(0, 100)}...</p>

            <div className="mt-4 flex justify-between text-sm text-gray-400">
              <p>Likes: {blog.likes?.length || 0}</p>
              <p>Comments: {blog.comments?.length || 0}</p>
            </div>

            <div className="mt-3">
              <h3 className="text-orange-400 text-sm">Liked By:</h3>
              <ul className="text-xs">
                {blog.likes?.map((l, i) => (
                  <li key={i}>{l.name}</li>
                ))}
              </ul>

              <h3 className="text-orange-400 text-sm mt-2">Comments:</h3>
              <ul className="text-xs">
                {blog.comments?.map((c, i) => (
                  <li key={i}>
                    <b>{c.user.name}</b>: {c.comment}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => (window.location.href = `/blogs/${blog._id}`)}
                className="bg-orange-500 hover:bg-orange-600 transition-all rounded px-4 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 hover:bg-red-700 transition-all rounded px-4 py-1"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
