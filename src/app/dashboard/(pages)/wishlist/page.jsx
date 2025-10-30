"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function MyWishlist() {
  const { data: session } = useSession();
  const user = session?.user;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist
  useEffect(() => {
    if (!user) return;

    async function fetchWishlist() {
      try {
        const res = await fetch(`/api/wishlist/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [user]);

  const handleRemove = async (movieId) => {
    try {
      const res = await fetch("/api/wishlist/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, movieId }),
      });
      const data = await res.json();
      if (res.ok) {
        setWishlist((prev) => prev.filter((m) => m._id !== movieId));
        toast.success("Removed from wishlist");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from wishlist");
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-white">
        Please login to see your wishlist
      </p>
    );

  return (
    <div className="p-4 sm:p-8 flex mx-auto bg-base rounded-lg mt-20">
      <Toaster position="top-right" />

      {/* <h2 className="text-3xl font-bold text-white mb-6">My Wishlist</h2> */}

      {loading ? (
        <p className="text-gray-300">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="text-gray-300">Your wishlist is empty.</p>
      ) : (
        <>
          {/* Mobile / Small screens */}
          <div className="flex flex-col gap-4 md:hidden">
            {wishlist.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-900 text-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <div className="w-20 h-28 relative flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={movie.imageUrl}
                      alt={movie.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{movie.name}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">
                      {movie.category} | {movie.language}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Link
                    href={`/movies/${movie._id}`}
                    className="px-4 py-1 bg-primary rounded text-white hover:bg-orange-400 transition text-center"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleRemove(movie._id)}
                    className="px-4 py-1 bg-red-600 rounded text-white hover:bg-red-500 transition text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Medium / Large screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2 border border-gray-700">Thumbnail</th>
                  <th className="px-4 py-2 border border-gray-700">Movie Name</th>
                  <th className="px-4 py-2 border border-gray-700">Category</th>
                  <th className="px-4 py-2 border border-gray-700">Language</th>
                  <th className="px-4 py-2 border border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((movie) => (
                  <tr
                    key={movie._id}
                    className="text-white hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2 border border-gray-700 w-24 h-28">
                      <div className="relative w-24 h-28 rounded overflow-hidden">
                        <Image
                          src={movie.imageUrl}
                          alt={movie.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-gray-700">{movie.name}</td>
                    <td className="px-4 py-2 border border-gray-700">{movie.category}</td>
                    <td className="px-4 py-2 border border-gray-700">{movie.language}</td>
                    <td className="px-4 py-2  border-gray-700 flex gap-2">
                      <Link
                        href={`/movies/${movie._id}`}
                        className="px-4 py-2 bg-primary rounded text-white hover:bg-orange-400 transition"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleRemove(movie._id)}
                        className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
