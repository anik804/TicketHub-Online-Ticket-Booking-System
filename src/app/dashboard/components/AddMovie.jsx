"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function AddMovie() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
    ticketPrice: "",
    description: "",
    imageUrl: "",
    director: "",
    writer: "",
    duration: "",
    category: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories = [
    "Sci-Fi",
    "Action",
    "Romantic",
    "Comedy",
    "Horror",
    "Thriller",
    "Drama",
  ];

  const locations = ["Star Cineplex", "Silver Screen"];
  const languages = ["Bangla Movie", "English Movie", "Hindi Movie", "South Indian Movie"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();

      if (res.ok) {
        setFormData({ ...formData, imageUrl: result.url });
        toast.success("✅ Image uploaded!");
      } else {
        toast.error("❌ Image upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error("Please upload a movie poster before submitting.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setFormData({
          name: "",
          location: "",
          date: "",
          time: "",
          ticketPrice: "",
          description: "",
          imageUrl: "",
          director: "",
          writer: "",
          duration: "",
          category: "",
          language: "",
        });
      } else {
        toast.error(result.error || "Failed to add movie");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-full p-8 bg-[#131a26] rounded-xl"
    >
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Movie Name */}
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full input input-bordered bg-white placeholder-gray-600 text-black"
          required
        />

        {/* Location */}
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full select px-2 select-bordered rounded bg-white placeholder-gray-600 text-black"
          required
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
        </div>

        {/* Ticket Price, Director, Writer, Duration */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price (৳)"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
          <input
            type="text"
            name="writer"
            placeholder="Writer"
            value={formData.writer}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 2h 10m)"
            value={formData.duration}
            onChange={handleChange}
            className="input input-bordered bg-white placeholder-gray-600 text-black"
            required
          />
        </div>

        {/* Category & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select px-2 select-bordered rounded bg-white placeholder-gray-600 text-black"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="select rounded px-2 select-bordered bg-white placeholder-gray-600 text-black"
            required
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Movie Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full textarea textarea-bordered bg-white placeholder-gray-600 text-black"
          rows="3"
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">Upload Movie Poster</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && (
            <p className="text-sm text-orange-500">Uploading image...</p>
          )}
          {formData.imageUrl && (
            <motion.img
              src={formData.imageUrl}
              alt="Poster Preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-56 object-cover rounded-lg mt-2 shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.div className="flex justify-center mt-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05, backgroundColor: "#f97316", color: "#000" }}
            whileTap={{ scale: 0.97 }}
            className="btn bg-black text-orange-500 px-10"
          >
            {loading ? "Adding Movie..." : "Add Movie"}
          </motion.button>
        </motion.div>
      </form>
    </motion.section>
  );
}
