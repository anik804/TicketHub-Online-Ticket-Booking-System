// app/categories/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { eventsData } from "@/app/lib/eventsData";

export default function CategoryPage({ params }) {
  const { slug } = params;
  const events = eventsData[slug] || [];

  return (
    <section className="w-full px-4 py-16 max-w-7xl mx-auto">
      {/* Page Heading */}
      <h1 className="pb-10 text-4xl md:text-5xl font-extrabold text-center capitalize 
                     bg-gradient-to-r from-[#3D0000] via-[#950101] to-[#FF0000] 
                     bg-clip-text text-transparent">
        {slug} Events
      </h1>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl border-[1px] border-transparent bg-gradient-to-r from-[#FF7F50] via-[#FF4500] to-[#FF0000] p-[1px] pointer-events-none">
              <div className="absolute inset-0 bg-white rounded-3xl"></div>
            </div>

            {/* Event Image */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Event Info */}
            <div className="flex-1 p-6 flex flex-col relative z-10">
              <h2 className="text-lg font-bold text-gray-700 mb-2 line-clamp-1">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-[#FF0000] mt-3 mb-4 font-semibold text-lg">
                ৳{event.price}
              </p>

              {/* CTA */}
              <Link
                href={`/events/${slug}/${event.id}`}
                className="mt-auto inline-block w-full px-5 py-2.5 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-[#950101] to-[#FF0000] hover:opacity-90 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
