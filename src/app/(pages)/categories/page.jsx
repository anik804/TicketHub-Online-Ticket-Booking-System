// components/Categories.jsx
import Link from "next/link";

const categories = [
  { name: "Movies", icon: "🎬", slug: "movies" },
  { name: "Concerts", icon: "🎵", slug: "concerts" },
  { name: "Theater", icon: "🎭", slug: "theater" },
  { name: "Sports", icon: "🏆", slug: "sports" },
  { name: "Travel/Transport", icon: "✈️", slug: "travel" },
  { name: "Workshops & Food Events", icon: "🍴", slug: "workshops" },
];

export default function Categories() {
  return (
    <section className="w-full px-4 py-16">
      <h1 className="pb-5 text-xl md:text-2xl font-semibold text-center">
        Explore by Categories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={`/categories/${cat.slug}`}
            className="p-6 border bg-[#3D0000] rounded-lg shadow-md hover:shadow-lg flex flex-col items-center hover:scale-105 transition"
          >
            <span className="text-4xl">{cat.icon}</span>
            <h2 className="mt-2 text-white font-semibold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
