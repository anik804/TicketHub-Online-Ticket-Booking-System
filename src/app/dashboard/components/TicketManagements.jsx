"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPriceEvent, setEditPriceEvent] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [decreaseSeatEvent, setDecreaseSeatEvent] = useState(null); // seat decrease modal

  // Fetch events
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/organizer/events?email=${session.user.email}`);
        const data = await res.json();
        setEvents(data.map(e => ({ ...e, _id: e._id.toString() })));
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

      setEvents(prev => prev.map(e => (e._id === data._id ? { ...data } : e)));
      toast.success("✅ Event updated successfully!");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading events...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-[#FF0000]/5 via-white to-[#3D0000]/5 rounded-2xl shadow-md mt-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] bg-clip-text text-transparent">
        Manage Your Events
      </h2>

      {events.length === 0 && <p className="text-center text-gray-600">No events found.</p>}

      <div className="space-y-4">
        {events.map(event => (
          <div
            key={event._id}
            className="flex justify-between items-center border border-[#950101]/30 bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-semibold text-lg text-[#3D0000]">{event.title}</h3>
              <p className="text-sm text-gray-700">
                Seats: <span className="font-medium">{event.availableSeats}/{event.totalSeats}</span>
              </p>
              <p className="text-sm text-gray-700">
                Price: <span className="font-medium">${event.price}</span> | Discount: {event.discount}%
              </p>
            </div>

            <div className="flex gap-2">
              {/* +5 Seats */}
              <button
                className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#950101] shadow-md transition"
                onClick={() => handleUpdate(event._id, { totalSeats: event.totalSeats + 5 })}
              >
                +5 Seats
              </button>

              {/* -1 Seat */}
              <button
                className="px-3 py-1 rounded-lg border border-[#950101] text-[#950101] bg-white hover:bg-[#950101] hover:text-white transition"
                onClick={() => setDecreaseSeatEvent(event)}
              >
                -1 Seat
              </button>

              {/* Edit Price */}
              <button
                className="px-3 py-1 rounded-lg border border-[#950101] text-[#950101] bg-white hover:bg-[#950101] hover:text-white transition"
                onClick={() => { setEditPriceEvent(event); setNewPrice(event.price); }}
              >
                Edit Price
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {/* Decrease Seat Modal */}
        {decreaseSeatEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 shadow-xl w-96"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-[#3D0000] mb-4">{decreaseSeatEvent.title}</h3>
              <p className="text-gray-700 mb-6">
                Current Available Seats: <span className="font-semibold">{decreaseSeatEvent.availableSeats}</span>
              </p>
              <p className="text-gray-700 mb-6">
                Are you sure you want to decrease <b>1 seat</b> from this event?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border border-[#950101]/40 text-[#3D0000] bg-white hover:bg-[#950101]/10 transition"
                  onClick={() => setDecreaseSeatEvent(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#950101] to-[#FF0000] text-white hover:opacity-90 transition"
                  onClick={async () => {
                    const availableSeats = decreaseSeatEvent.availableSeats;
                    if (availableSeats > 0) {
                      await handleUpdate(decreaseSeatEvent._id, { availableSeats: availableSeats - 1 });
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
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 shadow-xl w-96"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-bold text-[#3D0000] mb-4">Edit Price</h3>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#950101]"
              />
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg border border-[#950101]/40 text-[#3D0000] bg-white hover:bg-[#950101]/10 transition"
                  onClick={() => setEditPriceEvent(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#950101] to-[#FF0000] text-white hover:opacity-90 transition"
                  onClick={async () => {
                    const priceValue = parseFloat(newPrice);
                    if (!isNaN(priceValue)) await handleUpdate(editPriceEvent._id, { price: priceValue });
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
