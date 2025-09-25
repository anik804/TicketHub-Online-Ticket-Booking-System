"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ManageEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/organizer/events?email=${session.user.email}`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        toast.error("❌ Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch("/api/organizer/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: id, ...updates }),
      });
      const data = await res.json();
      setEvents(events.map((e) => (e._id === id ? data : e)));
      toast.success("✅ Event updated successfully!");
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/organizer/delete?eventId=${id}`, { method: "DELETE" });
      setEvents(events.filter((e) => e._id !== id));
      toast.success("🗑️ Event deleted!");
    } catch (err) {
      toast.error("❌ Delete failed");
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading events...</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-[#FF0000]/5 via-white to-[#3D0000]/5 rounded-2xl shadow-md mt-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] bg-clip-text text-transparent">
        Manage Your Events
      </h2>

      {events.length === 0 && (
        <p className="text-center text-gray-600">No events found.</p>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex justify-between items-center border border-[#950101]/30 bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-semibold text-lg text-[#3D0000]">{event.title}</h3>
              <p className="text-sm text-gray-700">
                Seats:{" "}
                <span className="font-medium">
                  {event.availableSeats}/{event.totalSeats}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Price: <span className="font-medium">${event.price}</span> | Discount:{" "}
                {event.discount}%
              </p>
            </div>

            <div className="flex gap-2">
              {/* Primary - Add Seats */}
              <button
                className="px-3 py-1 rounded-lg text-white bg-gradient-to-r from-[#950101] to-[#FF0000] hover:from-[#FF0000] hover:to-[#950101] shadow-md transition"
                onClick={() =>
                  handleUpdate(event._id, { totalSeats: event.totalSeats + 5 })
                }
              >
                +5 Seats
              </button>

              {/* Secondary - Edit Price */}
              <button
                className="px-3 py-1 rounded-lg border border-[#950101] text-[#950101] bg-white hover:bg-[#950101] hover:text-white transition"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "number";
                  input.value = event.price;
                  input.className =
                    "p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#950101]";
                  const wrapper = document.createElement("div");
                  wrapper.appendChild(input);

                  toast(
                    (t) => (
                      <div>
                        <p className="font-semibold mb-2">Edit Price</p>
                        <input
                          type="number"
                          defaultValue={event.price}
                          className="p-2 border rounded-md w-32"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const newPrice = parseFloat(e.target.value);
                              if (!isNaN(newPrice)) handleUpdate(event._id, { price: newPrice });
                              toast.dismiss(t.id);
                            }
                          }}
                        />
                        <button
                          className="mt-2 px-3 py-1 bg-[#950101] text-white rounded"
                          onClick={() => {
                            const newPrice = parseFloat(input.value);
                            if (!isNaN(newPrice)) handleUpdate(event._id, { price: newPrice });
                            toast.dismiss(t.id);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    ),
                    { duration: 5000 }
                  );
                }}
              >
                Edit Price
              </button>

              {/* Danger - Delete */}
              <button
                className="px-3 py-1 rounded-lg text-white bg-[#3D0000] hover:bg-[#FF0000] transition shadow-sm"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
