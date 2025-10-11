"use client";
import { useEffect, useState } from "react";
import Loader from "./shared/Loader";

export default function OrganizerReminder() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data));
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">📅 Your Reminders</h1>
      {reminders.length === 0 ? (
        <Loader></Loader>
      ) : (
        <ul className="mt-4 space-y-3">
          {reminders.map((r) => (
            <li key={r._id} className="bg-white shadow p-4 rounded-xl">
              <p className="font-semibold">{r.eventName}</p>
              <p className="text-sm text-gray-500">{r.date}</p>
              <p className="text-green-600">{r.status}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
