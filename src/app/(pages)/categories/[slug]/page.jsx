// app/categories/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import { eventsData } from "@/app/lib/eventsData";

export default function CategoryPage({ params }) {
  const { slug } = params;
  const events = eventsData[slug] || [];

  return (
    <section className="w-full px-4 py-16">
      <h1 className="pb-5 text-xl md:text-2xl font-semibold text-center capitalize">
        {slug} Events
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border bg-[#3D0000]  rounded-lg shadow-md hover:shadow-lg  flex flex-col h-full"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={400}
              height={250}
              className="rounded-lg mb-4 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl text-[#FF0000] mb-2 font-bold">{event.title}</h2>
              <p className="text-sm text-white">{event.date}</p>
              <p className="text-white">{event.location}</p>
              <p className="text-red-600 mt-2 mb-2 font-semibold">
                ৳{event.price}
              </p>
            </div>
            <Link
              href={`/events/${slug}/${event.id}`}
              className=" inline-block w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
