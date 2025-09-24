"use client";

import React from "react";

// TicketDetails.jsx
// Single-file React component (Tailwind CSS classes assumed available)
// Usage: <TicketDetails ticket={ticketObject} />

export default function TicketDetails({ ticket = null }) {
  // Fake ticket data (used when no `ticket` prop is provided)
  const fake = {
    id: "TCKT-20250923-0001",
    event: {
      title: "Sunset Jazz Night",
      date: "2025-10-18",
      time: "19:30",
      venue: "Glasshouse Hall, Dhaka",
    },
    holder: {
      name: "Ayesha Rahman",
      email: "ayesha@example.com",
      phone: "+8801712345678",
    },
    seat: {
      section: "A",
      row: "5",
      number: "12",
      type: "VIP",
    },
    price: 1500.0,
    currency: "BDT",
    purchaseDate: "2025-09-20T14:48:00Z",
    status: "Confirmed",
    qrPayload: "TCKT-20250923-0001|Sunset Jazz Night|AYESHA",
  };

  const t = ticket || fake;

  function formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  }

  // Simple inline SVG QR-code-ish placeholder (not a real QR generator)
  const QRPlaceholder = ({ payload }) => (
    <div className="w-40 h-40 bg-white p-2 rounded-md shadow-inner grid grid-cols-4 gap-1">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-full ${i % 3 === 0 ? "bg-gray-900" : "bg-gray-200"}`}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-md">
      <header className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">{t.event.title}</h1>
          <p className="text-sm text-gray-600">{t.event.venue}</p>
          <p className="mt-2 text-gray-700">{t.event.date} · {t.event.time}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Ticket ID</p>
          <p className="font-mono text-sm">{t.id}</p>
          <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${t.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {t.status}
          </span>
        </div>
      </header>

      <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium">Ticket & Holder</h2>

          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Holder</p>
              <p className="font-semibold">{t.holder.name}</p>
              <p className="text-sm text-gray-600">{t.holder.email}</p>
              <p className="text-sm text-gray-600">{t.holder.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Purchase</p>
              <p className="font-semibold">{formatDate(t.purchaseDate)}</p>
              <p className="text-xs text-gray-500 mt-2">Price</p>
              <p className="font-semibold">{t.price.toLocaleString()} {t.currency}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Section</p>
              <p className="font-semibold">{t.seat.section}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Row</p>
              <p className="font-semibold">{t.seat.row}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Seat</p>
              <p className="font-semibold">{t.seat.number}</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600">Type: <span className="font-medium">{t.seat.type}</span></p>
        </section>

        <aside className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center gap-4">
          <QRPlaceholder payload={t.qrPayload} />

          <div className="text-center">
            <p className="text-xs text-gray-500">Present this QR at entry</p>
            <p className="mt-2 font-mono text-sm break-words">{t.qrPayload}</p>
          </div>

          <button
            onClick={() => window.print()}
            className="mt-2 w-full inline-block text-sm py-2 px-3 border rounded-md hover:shadow">
            Print Ticket
          </button>
        </aside>
      </main>

      <footer className="mt-6 bg-white p-4 rounded-lg text-sm text-gray-600">
        <p><span className="font-medium">Notes:</span> Please arrive 30 minutes before start time. Tickets are non-refundable unless the event is cancelled.</p>
      </footer>
    </div>
  );
}
