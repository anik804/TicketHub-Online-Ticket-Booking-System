"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./shared/Loader";

export default function ManageEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPriceEvent, setEditPriceEvent] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [decreaseSeatEvent, setDecreaseSeatEvent] = useState(null);

  // Fetch events
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `/api/organizer/events?email=${session.user.email}`
        );
        const data = await res.json();
        setEvents(data.map((e) => ({ ...e, _id: e._id.toString() })));
      } catch (err) {
        toast.error("❌ Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  // Update event
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch("/api/organizer/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, ...updates }),
      });
      const data = await res.json();

      setEvents((prev) =>
        prev.map((e) => (e._id === data._id ? { ...data } : e))
      );
      toast.success("✅ Event updated successfully!");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-base-100  rounded-2xl shadow-md mt-6 ">
      {/* <h2 className="text-4xl text-gray-600 font-bold mb-8 text-center ">
        Manage Events
      </h2> */}

      {events.length === 0 && (
        <p className="text-center text-gray-500">No events found.</p>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center border border-gray-200 dark:border-gray-700 bg-base-100 dark:bg-gray-900 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-lg text-[#d96c2c]">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Seats:{" "}
                <span className="font-medium">
                  {event.availableSeats}/{event.totalSeats}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Price: <span className="font-medium">${event.price}</span> |
                Discount: {event.discount}%
              </p>
            </div>

            <div className="flex gap-2">
              {/* +5 Seats */}
              <button
                className="px-4 py-2 rounded-md bg-[#d96c2c] text-white hover:bg-[#ff8533] transition font-medium"
                onClick={() =>
                  handleUpdate(event._id, { totalSeats: event.totalSeats + 5 })
                }
              >
                +5 Seats
              </button>

              {/* -1 Seat */}
              <button
                className="px-4 py-2 rounded-md border border-[#d96c2c] text-gray-600 bg-transparent hover:bg-[#d96c2c] hover:text-white transition font-medium"
                onClick={() => setDecreaseSeatEvent(event)}
              >
                -1 Seat
              </button>

              {/* Edit Price */}
              <button
                className="px-4 py-2 rounded-md border border-[#d96c2c] text-gray-600 bg-transparent hover:bg-[#d96c2c] hover:text-white transition font-medium"
                onClick={() => {
                  setEditPriceEvent(event);
                  setNewPrice(event.price);
                }}
              >
                Edit Price
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {/* Decrease Seat Modal */}
        {decreaseSeatEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-[#d96c2c] mb-4">
                {decreaseSeatEvent.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Current Available Seats:{" "}
                <span className="font-semibold">
                  {decreaseSeatEvent.availableSeats}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to decrease <b>1 seat</b> from this event?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setDecreaseSeatEvent(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-[#d96c2c] text-white hover:bg-[#ff8533] transition"
                  onClick={async () => {
                    const availableSeats = decreaseSeatEvent.availableSeats;
                    if (availableSeats > 0) {
                      await handleUpdate(decreaseSeatEvent._id, {
                        availableSeats: availableSeats - 1,
                      });
                      toast.success("➖ 1 seat removed");
                    } else {
                      toast.error("❌ No seats left to decrease");
                    }
                    setDecreaseSeatEvent(null);
                  }}
                >
                  Yes, Decrease
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Edit Price Modal */}
        {editPriceEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-[#d96c2c] mb-4">
                Edit Price
              </h3>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#d96c2c]"
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  onClick={() => setEditPriceEvent(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-[#d96c2c] text-white hover:bg-[#ff8533] transition"
                  onClick={async () => {
                    const priceValue = parseFloat(newPrice);
                    if (!isNaN(priceValue))
                      await handleUpdate(editPriceEvent._id, {
                        price: priceValue,
                      });
                    setEditPriceEvent(null);
                  }}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
