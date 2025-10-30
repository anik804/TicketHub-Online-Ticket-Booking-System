"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import DashboardSection from "../../components/shared/DashboardSection";

export default function MyBlogsPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setEditTitle(blog.title);
    setEditContent(blog.content);
  };

  const handleUpdate = async () => {
    if (!editTitle || !editContent) return;

    const res = await fetch(`/api/blogs/${editingBlog._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });

    if (res.ok) {
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === editingBlog._id
            ? { ...b, title: editTitle, content: editContent }
            : b
        )
      );
      setEditingBlog(null);
    }
  };

  if (!session)
    return (
      <p className="text-center text-gray-400 mt-10">
        Please log in to view your blogs.
      </p>
    );

  return (
    <DashboardSection title={`${session.user.name}’s Blogs`} role="user">
      <div className="min-h-screen bg-base text-white p-6 sm:p-8 md:p-10">
        {blogs.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            You have no blogs yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between bg-black rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-orange-500/40 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3rem]">
                  {blog.title}
                </h2>
                <div className="text-sm text-gray-400 flex justify-between mb-4">
                  <p>Likes: {blog.likes?.length || 0}</p>
                  <p>Comments: {blog.comments?.length || 0}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 transition-all rounded-xl px-3 py-2 text-white text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 transition-all rounded-xl px-3 py-2 text-white text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {editingBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-black rounded-2xl p-6 w-full max-w-lg text-white"
              >
                <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                <input
                  className="w-full mb-4 p-2 border border-gray-700 rounded bg-black text-white"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="w-full mb-4 p-2 border border-gray-700 rounded bg-black text-white h-32"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Content"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingBlog(null)}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardSection>
  );
}
