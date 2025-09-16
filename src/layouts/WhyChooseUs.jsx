import { ShieldCheck, Zap, RotateCcw, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#950101]" />,
      title: "Secure Payments",
      desc: "Safe transactions with SSL/TLS encryption.",
    },
    {
      icon: <Zap className="w-12 h-12 text-[#950101]" />,
      title: "Instant Confirmation",
      desc: "Get your ticket confirmation instantly after booking.",
    },
    {
      icon: <RotateCcw className="w-12 h-12 text-[#950101]" />,
      title: "Easy Refunds",
      desc: "Quick refunds for canceled bookings.",
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#950101]" />,
      title: "24/7 Support",
      desc: "Round-the-clock customer assistance.",
    },
  ];

  return (
    <section className="w-full px-4 py-16">
      <h1 className="pb-5 text-xl md:text-2xl font-semibold text-center">
        Why Choose Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center text-center hover:scale-105 hover:rotate-1 custom-transition"
          >
            <div className="mb-4 bg-[#FF000011] rounded-full p-4">
              {f.icon}
            </div>
            <h2 className="text-xl font-bold mb-2 text-[#3D0000]">{f.title}</h2>
            <p className="text-gray-700">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
