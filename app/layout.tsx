import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Toaster } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const metadata: Metadata = {
  title: "Velvet Pour",
  description: "Spirit of Summer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
