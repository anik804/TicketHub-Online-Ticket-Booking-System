import Link from "next/link";
import { Film, Music, Theater, Trophy, Airplay, Coffee } from "lucide-react";

const categories = [
  { name: "Movies", icon: <Film size={40} />, slug: "movies" },
  { name: "Concerts", icon: <Music size={40} />, slug: "concerts" },
  { name: "Theater", icon: <Theater size={40} />, slug: "theater" },
  { name: "Sports", icon: <Trophy size={40} />, slug: "sports" },
  { name: "Travel/Transport", icon: <Airplay size={40} />, slug: "travel" },
  { name: "Workshops & Food Events", icon: <Coffee size={40} />, slug: "workshops" },
];

export default function Categories() {
  return (
    <section className="w-full px-4 py-16 min-h-screen">

      {/* Heading stays the same */}
      <h1
        className="pb-7 text-4xl md:text-5xl font-extrabold text-center
                   bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000]
                   bg-clip-text text-transparent"
      >
        Explore by Categories
      </h1>

      {/* Grid */}
      <div className="grid pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <Link
  key={i}
  href={`/categories/${cat.slug}`}
  className="p-6 border rounded-lg shadow-md hover:shadow-lg flex flex-col items-center hover:scale-105 transition
             bg-gradient-to-br from-[#4d0000] via-[#a60000] to-[#ff4d4d] h-40" // h-72 height
>
  <span className="text-4xl text-white pt-4">{cat.icon}</span>
  <h2 className="mt-2 text-white font-semibold text-center">{cat.name}</h2>
</Link>

        ))}
      </div>
    </section>
  );
}
