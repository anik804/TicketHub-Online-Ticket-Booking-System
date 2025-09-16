import React from "react";

export default function SpecialOffers() {
  // Dummy event data
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2025-10-20",
      location: "Dhaka, Bangladesh",
      price: 1200,
      discount: "20% Off",
    },
    {
      id: 2,
      title: "Tech Expo 2025",
      date: "2025-11-05",
      location: "Chittagong, Bangladesh",
      price: 800,
      discount: "Early Bird",
    },
    {
      id: 3,
      title: "Food Carnival",
      date: "2025-10-25",
      location: "Sylhet, Bangladesh",
      price: 500,
      discount: "Buy 1 Get 1",
    },
    {
      id: 4,
      title: "Comedy Night",
      date: "2025-12-01",
      location: "Dhaka, Bangladesh",
      price: 700,
      discount: "15% Off",
    },
  ];

  return (
    <section className="w-full">
      <h1 className="pb-5 text-xl md:text-2xl font-semibold text-center">Special Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center justify-center hover:scale-102 hover:rotate-3 transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
            <p className="text-lg text-[#3D0000] bg-[#FF000011] rounded-full py-1 px-3 my-2">{event.date}</p>
            <p className="text-xl font-semibold">{event.location}</p>
            <p className="mt-2 font-semibold text-[#FF0000]">৳{event.price}</p>
            <span className="inline-block mt-1 text-xl text-[#950101] font-bold">
              {event.discount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
