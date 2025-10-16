"use client";
import Image from "next/image";
import { MessageSquareQuote } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function FeedbackSection() {
  const { data: session } = useSession();
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (feedbacks.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [feedbacks]);

  const handleAddFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const newItem = {
      feedback: newFeedback.trim(),
      name: session?.user?.name || "Anonymous",
      role: "Customer",
      img: session?.user?.image || "/user1.jpg",
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        const saved = await res.json();
        setFeedbacks((prev) => [saved, ...prev]);
        setNewFeedback("");
        toast.success("Feedback submitted successfully!");
      } else {
        toast.error("Failed to submit feedback!");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Failed to submit feedback!");
    }
  };

  return (
    <section
      className="relative my-10 bg-gray-50 py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/feedback.jpg')", backgroundAttachment: "fixed" }}
    >
      <Toaster position="top-right" />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2 text-[#d96c2c] mb-3">
            <MessageSquareQuote size={20} />
            <span className="text-sm font-medium">User Feedback</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
            What Users Are Saying <br /> About TicketHub?
          </h2>

          <p className="text-gray-600 mb-6">
            We value every opinion — here’s what our users think about booking, managing, and organizing events on TicketHub.
          </p>

          {/* Feedback Form */}
          <form onSubmit={handleAddFeedback} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-4">
            <textarea
              rows="3"
              placeholder="Write your feedback..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            ></textarea>

            <button
              type="submit"
              className="mt-3 hover:text-black hover:bg-white bg-[#d96c2c] text-white font-semibold py-2 px-4 rounded transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="relative w-full flex items-center justify-center">
          {loading ? (
            <p className="text-gray-500 text-lg">Loading feedbacks...</p>
          ) : feedbacks.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={feedbacks[current]._id || feedbacks[current].feedback}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="relative bg-white border-4 border-black p-8 shadow-lg rounded-xl max-w-xl"
              >
                <p className="text-gray-700 leading-relaxed mb-6">{feedbacks[current].feedback}</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d96c2c]">
                    <Image
                      src={feedbacks[current].img || "/user1.jpg"}
                      alt={feedbacks[current].name || "User"}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feedbacks[current].name || "Anonymous"}</h4>
                    <p className="text-[#d96c2c] text-sm">{feedbacks[current].role || "Customer"}</p>
                  </div>
                </div>

                <div className="absolute -bottom-3 left-12 w-6 h-6 bg-white border-b-3 border-r-3 border-black rotate-45"></div>

                <div className="absolute -bottom-6 right-6 w-16 h-16 bg-[#d96c2c] rounded-full flex items-center justify-center shadow-md">
                  <MessageSquareQuote className="text-white" size={28} />
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="text-gray-500 text-lg">No feedbacks yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </section>
  );
}
