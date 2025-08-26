"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Booking = () => {
  useGSAP(() => {
    // Title animation
    const titleSplit = SplitText.create("#booking h2", { type: "words" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#booking",
          start: "top center",
        },
        ease: "power1.inOut",
      })
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#booking form", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
      });

    // Leaves animation
    const leafTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#booking",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    leafTimeline
      .to("#b-right-leaf", {
        y: "-50",
        duration: 1,
        ease: "power1.inOut",
      })
      .to("#b-left-leaf", {
        y: "50",
        duration: 1,
        ease: "power1.inOut",
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      date: e.target[3].value,
      time: e.target[4].value,
      guests: e.target[5].value,
      requests: e.target[6].value,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Table reserved successfully!");
      e.target.reset();
    } else {
      alert("Failed to reserve table. Please try again.");
    }
  };

  return (
    <section
      id="booking"
      className="relative w-full min-h-screen flex items-center justify-center px-4 radial-gradient overflow-hidden"
    >
      {/* Decorative leaves */}
      <img
        id="b-left-leaf"
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        className="absolute bottom-0 left-0 pointer-events-none lg:w-fit w-1/3"
      />
      <img
        id="b-right-leaf"
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        className="absolute top-0 right-0 pointer-events-none hidden lg:block"
      />

      <div className="content w-full flex flex-col gap-10 items-center">
        <h2 className="lg:text-6xl 2xl:text-8xl text-5xl font-modern-negra text-center">
          Book a Table
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-4xl text-left"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors"
            required
          />
          <div className="flex gap-5 flex-col sm:flex-row">
            <input
              type="date"
              className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors w-full sm:w-1/2"
              required
            />
            <input
              type="time"
              className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors w-full sm:w-1/2"
              placeholder="Time"
              required
            />
          </div>
          <input
            type="number"
            placeholder="Number of Guests"
            min="1"
            className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors"
            required
          />
          <textarea
            placeholder="Special Requests (optional)"
            rows="4"
            className="bg-transparent border border-white-100 p-4 text-white rounded-lg focus:outline-none focus:border-yellow transition-colors resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow text-black font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Reserve Table
          </button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
