"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  // Fetch Movies
  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    } catch {
      toast.error("Failed to load movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Delete Movie
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMovies(movies.filter((m) => m._id !== id));
        toast.success("Movie deleted successfully");
      } else toast.error("Delete failed");
    } catch {
      toast.error("Failed to delete movie");
    }
  };

  // Upload Image to Cloudinary
  const uploadImage = async () => {
    if (!file) return selectedMovie.imageUrl;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  };

  // Update Movie
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const imageUrl = await uploadImage();
      const updatedMovie = { ...selectedMovie, imageUrl };
      const res = await fetch(`/api/movies/${selectedMovie._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMovie),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success("Movie updated successfully");
        setMovies((prev) =>
          prev.map((m) => (m._id === selectedMovie._id ? updatedMovie : m))
        );
        setSelectedMovie(null);
        setPreviewImage(null);
        setFile(null);
      } else toast.error(result.error);
    } catch {
      toast.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesName = movie.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? movie.category === categoryFilter
      : true;
    return matchesName && matchesCategory;
  });

  const categories = Array.from(new Set(movies.map((m) => m.category)));

  return (
    <div className="flex-1 p-6 text-white min-h-screen bg-transparent">
      <Toaster position="top-right" />

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 mb-10">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 h-12 px-5 text-base placeholder-gray-400 text-white border border-orange-500 rounded-lg bg-[#111827] focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full md:w-1/4 h-12 px-4 text-base text-gray-300 border border-orange-500 rounded-lg bg-[#111827] focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
        >
          <option value="" className="text-white">
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="text-white">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie, index) => (
          <motion.div
            key={movie._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative rounded-lg overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500 bg-[#0f172a]"
          >
            <div className="relative h-[330px] w-full">
              <Image
                src={movie.imageUrl}
                alt={movie.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/90" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <h2 className="text-lg font-bold text-white">{movie.name}</h2>
              <p className="text-sm text-gray-400 mb-3">{movie.category}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-white text-sm font-semibold"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No movies found.
          </p>
        )}
      </div>
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 mt-10 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleUpdate}
              className="bg-[#1f2937] p-6 rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh] space-y-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-center text-orange-400 mb-4">
                ✏️ Update Movie
              </h2>

              {previewImage || selectedMovie.imageUrl ? (
                <div className="relative w-full h-48 mb-3">
                  <Image
                    src={previewImage || selectedMovie.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : null}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                  setPreviewImage(URL.createObjectURL(file));
                }}
                className="file-input file-input-bordered w-full bg-white text-black mb-4"
              />

              {/* Grid Layout for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "name",
                  "category",
                  "director",
                  "writer",
                  "language",
                  "location",
                  "duration",
                  "date",
                  "time",
                  "ticketPrice",
                ].map((field) => (
                  <input
                    key={field}
                    type={
                      field === "date"
                        ? "date"
                        : field === "time"
                        ? "time"
                        : field === "ticketPrice"
                        ? "number"
                        : "text"
                    }
                    placeholder={field}
                    value={selectedMovie[field] || ""}
                    onChange={(e) =>
                      setSelectedMovie({
                        ...selectedMovie,
                        [field]: e.target.value,
                      })
                    }
                    className="input input-bordered w-full bg-white text-black"
                  />
                ))}

                <textarea
                  placeholder="Description"
                  value={selectedMovie.description || ""}
                  onChange={(e) =>
                    setSelectedMovie({
                      ...selectedMovie,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="textarea textarea-bordered w-full bg-white text-black col-span-1 md:col-span-2"
                />
              </div>

              {/* <div className="flex justify-between gap-3 mt-4">
          <button
            type="submit"
            disabled={isUpdating}
            className="btn bg-orange-500 w-full text-white hover:bg-orange-600"
          >
            {isUpdating ? "Updating..." : "Update Movie"}
          </button>
          <button
            type="button"
            onClick={() => setSelectedMovie(null)}
            className="btn bg-gray-600 w-full text-white hover:bg-gray-700"
          >
            Cancel
          </button>
        </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn bg-orange-500 w-full text-white hover:bg-orange-600"
                >
                  {isUpdating ? "Updating..." : "Update Movie"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="btn bg-gray-600 w-full text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
