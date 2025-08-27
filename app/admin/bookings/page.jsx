"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);

  // Redirect non-admin users
  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      router.push("/"); // go home if not logged in as admin
    } else {
      // fetch bookings only if admin
      const fetchBookings = async () => {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      };
      fetchBookings();
    }
  }, [router]);

  return (
    <section className="relative w-full min-h-screen px-6 py-16 noisy text-white flex flex-col items-center">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="self-start mb-6 bg-yellow text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#d6c27f] transition"
      >
        ← Back to Home
      </button>

      <h2 className="font-modern-negra text-5xl text-yellow mb-10 text-center drop-shadow-lg">
        📋 Current Bookings
      </h2>

      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl">
          <thead>
            <tr className="bg-white/10 backdrop-blur-lg text-yellow">
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Phone</th>
              <th className="p-4 text-left font-semibold">Date</th>
              <th className="p-4 text-left font-semibold">Time</th>
              <th className="p-4 text-left font-semibold">Guests</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="bg-black hover:bg-gray-800 transition">
                <td className="p-4">{b.fullName}</td>
                <td className="p-4">{b.email}</td>
                <td className="p-4">{b.phone}</td>
                <td className="p-4">{b.date}</td>
                <td className="p-4">{b.time}</td>
                <td className="p-4">{b.guests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
