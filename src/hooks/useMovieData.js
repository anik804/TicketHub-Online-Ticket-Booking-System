"use client";
import { useState, useEffect } from "react";

export const useMovieData = ({ id }) => {
  const [movieData, setMovieData] = useState(null);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        console.log("🎬 Fetching movie for eventId:", id);
        const res = await fetch(`/api/browse-event/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Event fetch failed: ${res.statusText}`);
        const data = await res.json();
        console.log("✅ Movie Data Loaded:", data);
        setMovieData(data);
      } catch (err) {
        console.error("❌ Movie fetch error:", err);
        setMovieError(err.message);
      } finally {
        setMovieLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  return { movieData, movieLoading, movieError };
};
