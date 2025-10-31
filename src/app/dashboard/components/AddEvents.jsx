"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    eventDateTime: "",
    location: "",
    price: "",
    desc: "",
    category: "",
    imageUrl: "",
    totalSeats: "",
    availableSeats: "",
    discount: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // prevent negative numbers
    if (
      ["price", "totalSeats", "availableSeats", "discount"].includes(name) &&
      Number(value) < 0
    )
      return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/organizer/organizer-add-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, organizerEmail: email }),
      });
      if (res.ok) {
        setMessage("✅ Event added successfully!");
        setFormData({
          title: "",
          eventDateTime: "",
          location: "",
          price: "",
          desc: "",
          category: "",
          imageUrl: "",
          totalSeats: "",
          availableSeats: "",
          discount: "",
        });
      } else setMessage("❌ Failed to add event.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-600 dark:text-white mb-8">
        🎫 Add New Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-white"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
            required
          />

          <input
            type="datetime-local"
            name="eventDateTime"
            value={formData.eventDateTime}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price (৳)"
            value={formData.price}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            min="0"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full select select-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Concert">Concert 🎵</option>
            <option value="Sports">Sports 🏀</option>
            <option value="Workshop">Workshop 🛠️</option>
            <option value="Exhibition / Fair">Exhibition / Fair 🎨</option>
            <option value="Festival / Cultural Event">
              Festival / Cultural Event 🎭
            </option>
            <option value="Competition / Contest">
              Competition / Contest 🏆
            </option>
          </select>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
          />

          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            min="0"
          />

          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            min="0"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount (%)"
            value={formData.discount}
            onChange={handleChange}
            className="w-full input input-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white"
            min="0"
          />

          <textarea
            name="desc"
            placeholder="Event Description"
            value={formData.desc}
            onChange={handleChange}
            className="w-full textarea textarea-bordered border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-white min-h-[120px]"
          />

        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:scale-[1.02] transition-all duration-300"
          >
            {loading ? "Adding Event..." : "Add Event"}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-6 text-center font-medium text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
    </section>
  );
}
