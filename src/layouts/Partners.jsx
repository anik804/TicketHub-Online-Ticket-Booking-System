export default function Partners() {
  const partners = [
    { name: "AirlineX", logo: "/airasia.jpg" },
    { name: "BusLine", logo: "/busline.jpg" },
    { name: "MovieHub", logo: "/moviehub.jpg" },
    { name: "ConcertPro", logo: "/concertpro.jpg" },
  ];



  return (
    <section className="w-full px-4 py-16">
      <h1 className="pb-5 text-xl md:text-2xl font-semibold text-center">
        Partners & Trusted By
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
        {partners.map((p, i) => (
          <div
            key={i}
            className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg flex justify-center items-center hover:scale-105 hover:rotate-1 custom-transition"
          >
            <img
              src={p.logo}
              alt={p.name}
              className="h-25 object-contain bg-[#FF000011] p-2 rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
