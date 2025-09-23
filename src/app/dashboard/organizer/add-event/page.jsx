"use client";

import React, { useState } from "react";

const initialForm = {
  title: "",
  date: "",
  location: "",
  price: "",
  desc: "",
  category: "movies",
  imageUrl: "",
};

export default function AddEventPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const categories = [
    { value: "movies", label: "Movies" },
    { value: "concerts", label: "Concerts" },
    { value: "theater", label: "Theater" },
    { value: "sports", label: "Sports" },
    { value: "travel", label: "Travel/Transport" },
    { value: "workshops", label: "Workshops & Food Events" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!form.title || !form.date || !form.location || !form.price || !form.desc) {
      setMsg({ type: "error", text: "All fields are required." });
      return;
    }

    setLoading(true);

    try {
      
      const res = await fetch("/api/organizer/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMsg({ type: "success", text: "Event created successfully." });
        setForm(initialForm);
      } else {
        const err = await res.json();
        setMsg({ type: "error", text: err.message || "Failed to create event." });
      }
    } catch (err) {
      setMsg({ type: "error", text: "Network error, could not reach API." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>

      {msg && (
        <div
          className={`mb-4 p-3 rounded ${
            msg.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Event title"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (BDT)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="e.g. 500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Venue, City"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Write brief event description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/event.jpg"
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="preview"
              className="w-full max-h-56 object-cover rounded mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Create Event"}
        </button>
      </form>
    </main>
  );
}
