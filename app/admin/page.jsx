"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const headingRef = useRef(null);
  const formRef = useRef(null);

  // GSAP animations
  useGSAP(() => {
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, { type: "chars" });
      split.chars.forEach((c) => c.classList.add("text-gradient"));
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.05,
      });
    }

    if (formRef.current) {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  // Simple login handler
  function handleLogin(e) {
    e.preventDefault();
    if (
      email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      // Save a simple flag in sessionStorage
      sessionStorage.setItem("isAdmin", "true");
      router.push("/admin/bookings");
    } else {
      setError("Invalid credentials");
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      router.push("/admin/bookings");
    }
  }, []);

  return (
    <div className="relative min-h-screen flex-center noisy">
      <form
        onSubmit={handleLogin}
        ref={formRef}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-xl"
      >
        <h2
          ref={headingRef}
          className="font-modern-negra text-5xl text-yellow text-center mb-8"
        >
          Admin Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 mb-4 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 mb-6 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow"
        />
        <button
          type="submit"
          className="w-full bg-yellow text-black font-semibold py-3 rounded-lg hover:bg-[#d6c27f] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
