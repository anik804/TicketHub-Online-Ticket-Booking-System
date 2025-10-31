"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

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
    availableSeats: "",
    totalSeats: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { data: session } = useSession();

  const movieAdminEmail = session?.user?.email;

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
  const languages = [
    "Bangla Movie",
    "English Movie",
    "Hindi Movie",
    "South Indian Movie",
  ];

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "availableSeats" &&
      Number(value) > Number(formData.totalSeats)
    ) {
      toast.error("Available seats cannot exceed total seats.");
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      toast.error("❌ Image must be under 3MB");
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, imageUrl: result.url }));
        toast.success("✅ Poster uploaded successfully!");
      } else {
        toast.error("❌ Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload error occurred");
    } finally {
      setUploading(false);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.imageUrl) {
    //   toast.error("Please upload a movie poster before submitting.");
    //   return;
    // }

    if (Number(formData.availableSeats) > Number(formData.totalSeats)) {
      toast.error("Available seats cannot exceed total seats.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, movieAdminEmail }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "🎬 Movie added successfully!");
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
          availableSeats: "",
          totalSeats: "",
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8 bg-black/10 rounded shadow-md border-[1px] border-primary/30"
    >
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Movie Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-[#1a1a1a] text-white placeholder-gray-400 w-full"
            required
          />
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="select select-bordered bg-[#1a1a1a] text-white w-full"
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            required
          />
        </div>

        {/* Ticket & Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price (৳)"
            value={formData.ticketPrice}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            min="0"
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={formData.director}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            required
          />
          <input
            type="text"
            name="writer"
            placeholder="Writer"
            value={formData.writer}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 2h 10m)"
            value={formData.duration}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            required
          />
        </div>

        {/* Category & Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered bg-[#1a1a1a] text-white w-full"
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
            className="select select-bordered bg-[#1a1a1a] text-white w-full"
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

        {/* Seats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            min="0"
            required
          />
          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="input input-bordered bg-[#1a1a1a] text-white w-full"
            min="0"
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Movie Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered bg-[#1a1a1a] text-white w-full"
          rows="3"
        />

        {/* Poster Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-orange-400 font-medium">
            Upload Movie Poster
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full bg-[#1a1a1a] text-white"
          />
          {uploading && <p className="text-sm text-orange-400">Uploading...</p>}
          {formData.imageUrl && (
            <motion.img
              src={formData.imageUrl}
              alt="Poster Preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-56 object-cover rounded-lg mt-2 border border-orange-500 shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <motion.div className="flex justify-end mt-6">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className=" bg-orange-500 hover:bg-orange-400 text-black font-bold px-10 py-2 rounded-md float-end"
          >
            {loading ? "Adding Movie..." : "Add Movie"}
          </motion.button>
        </motion.div>
      </form>
    </motion.section>
  );
}
