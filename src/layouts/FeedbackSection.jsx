"use client";
import Image from "next/image";
import { MessageSquareQuote } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Customer",
      img: "/user1.jpg",
      feedback:
        "Booking tickets through TicketHub was super easy! The seat map and instant confirmation made the process smooth.",
    },
    {
      id: 2,
      name: "Anika Hasan",
      role: "Event Organizer",
      img: "/user2.jpg",
      feedback:
        "I really appreciate how TicketHub handles event listings and ticket sales — the dashboard is user-friendly and powerful.",
    },
    {
      id: 3,
      name: "Tanvir Ahmed",
      role: "Customer",
      img: "/user3.jpg",
      feedback:
        "Got my refund within hours! Excellent customer support and trustworthy service.",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [newFeedback, setNewFeedback] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [feedbacks.length]);

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const newItem = {
      id: Date.now(),
      name: "Anonymous User",
      role: "Visitor",
      img: "/default-user.jpg",
      feedback: newFeedback.trim(),
    };

    // New feedback first এ যোগ করা
    setFeedbacks((prev) => [newItem, ...prev]);
    setNewFeedback("");
  };

  return (
    <section
      className="relative my-10 bg-gray-50 py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/feedback.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 text-orange-600 mb-3">
            <MessageSquareQuote size={20} />
            <span className="text-sm font-medium">User Feedback</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-snug">
            What Users Are Saying <br /> About TicketHub?
          </h2>

          <p className="text-gray-600 mb-6">
            We value every opinion — here’s what our users think about booking,
            managing, and organizing events on TicketHub.
          </p>

          <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition mb-6">
            View All Feedbacks
          </button>

          {/* Comment Box */}
          <form
            onSubmit={handleAddFeedback}
            className="bg-white p-5 rounded-lg shadow-md border border-gray-200"
          >
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              rows="3"
              placeholder="Write your feedback..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Right Section - Animated Feedback Card */}
        <div className="relative w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={feedbacks[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white border-4 border-black p-8 shadow-lg rounded-xl max-w-xl"
            >
              <p className="text-gray-700 leading-relaxed mb-6">
                {feedbacks[current].feedback}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-600">
                  <Image
                    src={feedbacks[current].img}
                    alt={feedbacks[current].name}
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {feedbacks[current].name}
                  </h4>
                  <p className="text-orange-500 text-sm">
                    {feedbacks[current].role}
                  </p>
                </div>
              </div>

              {/* Pointer */}
              <div className="absolute -bottom-3 left-12 w-6 h-6 bg-white border-b-3 border-r-3 border-black rotate-45"></div>

              {/* Orange icon */}
              <div className="absolute -bottom-6 right-6 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-md">
                <MessageSquareQuote className="text-white" size={28} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
