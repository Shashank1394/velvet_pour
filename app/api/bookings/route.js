import dbConnect from "../../lib/mongodb";
import Booking from "../../models/Booking";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newBooking = await Booking.create({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      date: body.date,
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
    return new Response(JSON.stringify({ error: "Failed to create booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
