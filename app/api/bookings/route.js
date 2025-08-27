import dbConnect from "../../lib/mongodb";
import Booking from "../../models/Booking";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // Normalize date (YYYY-MM-DD)
    const bookingDate = new Date(body.date).toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    // Prevent past bookings
    if (bookingDate < today) {
      return new Response(
        JSON.stringify({ error: "❌ Cannot book for past dates" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Count total guests already booked for the day
    const totalGuests = await Booking.aggregate([
      { $match: { date: bookingDate } },
      { $group: { _id: null, total: { $sum: "$guests" } } },
    ]);

    const currentTotal = totalGuests.length > 0 ? totalGuests[0].total : 0;
    const maxGuests = 50;
    const remainingSeats = maxGuests - currentTotal;

    if (remainingSeats <= 0) {
      return new Response(
        JSON.stringify({
          error: "❌ Booking full for this date (50 guests limit reached)",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (body.guests > remainingSeats) {
      return new Response(
        JSON.stringify({
          error: `❌ Only ${remainingSeats} seats left for this date`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create the booking
    const newBooking = await Booking.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      date: bookingDate,
      time: body.time,
      guests: body.guests,
      requests: body.requests || "",
    });

    return new Response(JSON.stringify({ booking: newBooking }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Booking error:", error);
    return new Response(
      JSON.stringify({ error: "❌ Failed to create booking" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Optional: GET to list bookings if needed
export async function GET() {
  await dbConnect();
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 }).lean();
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Failed to fetch bookings : ${err}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
