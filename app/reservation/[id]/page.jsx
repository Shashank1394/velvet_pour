import dbConnect from "../../lib/mongodb";
import Booking from "../../models/Booking";
import Link from "next/link";

export default async function ReservationPage({ params }) {
  const { id } = params;

  await dbConnect();
  const booking = await Booking.findById(id).lean();

  if (!booking) {
    return (
      <section
        id="reservation"
        className="relative w-full min-h-screen flex items-center justify-center px-4 radial-gradient overflow-hidden"
      >
        <h2 className="text-4xl lg:text-6xl font-modern-negra text-center text-white">
          Reservation Not Found ❌
        </h2>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-yellow text-black font-semibold rounded-lg shadow-lg hover:bg-yellow/80 transition"
        >
          ⬅ Back Home
        </Link>
      </section>
    );
  }

  return (
    <section
      id="reservation"
      className="relative w-full min-h-screen flex items-center justify-center px-4 radial-gradient overflow-hidden"
    >
      <img
        id="r-left-leaf"
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        className="absolute bottom-0 left-0 pointer-events-none lg:w-fit w-1/3"
      />
      <img
        id="r-right-leaf"
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        className="absolute top-0 right-0 pointer-events-none hidden lg:block"
      />

      <div className="content w-full flex flex-col gap-10 items-center">
        <h2 className="lg:text-6xl 2xl:text-8xl text-5xl font-modern-negra text-center text-white">
          Reservation Confirmed 🎉
        </h2>

        <div className="w-full max-w-2xl flex flex-col gap-5 text-white">
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Name:</strong> {booking.fullName}
          </div>
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Email:</strong> {booking.email}
          </div>
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Phone:</strong> {booking.phone}
          </div>
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Date:</strong> {booking.date}
          </div>
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Time:</strong> {booking.time}
          </div>
          <div className="bg-transparent border border-white-100 p-4 rounded-lg">
            <strong className="text-yellow">Guests:</strong> {booking.guests}
          </div>
          {booking.requests && (
            <div className="bg-transparent border border-white-100 p-4 rounded-lg">
              <strong className="text-yellow">Requests:</strong>{" "}
              {booking.requests}
            </div>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-yellow text-black font-semibold rounded-lg shadow-lg hover:bg-yellow/80 transition"
        >
          ⬅ Back Home
        </Link>
      </div>
    </section>
  );
}
