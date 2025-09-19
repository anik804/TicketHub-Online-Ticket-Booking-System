// app/events/[category]/[id]/page.jsx
import Image from "next/image";
import { eventsData } from "@/app/lib/eventsData";

export default function EventDetails({ params }) {
  const { category, id } = params;
  const event = eventsData[category]?.find((e) => e.id === parseInt(id));

  if (!event) {
    return <p className="text-center mt-10 text-lg text-gray-500">Event not found.</p>;
  }

  return (
    <section className="w-full px-4 py-16 max-w-4xl mx-auto">
      {/* Event Image */}
      <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 text-gray-600">
          <p className="mb-2 md:mb-0">📅 {event.date}</p>
          <p>📍 {event.location}</p>
        </div>
        <p className="text-red-600 font-semibold text-xl mb-6">৳{event.price}</p>
        <hr className="mb-6 border-gray-300" />
        <p className="text-gray-700 text-lg leading-relaxed">{event.desc}</p>
      </div>
    </section>
  );
}
