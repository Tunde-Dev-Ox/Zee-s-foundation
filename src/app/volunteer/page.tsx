"use client";

import { useEffect } from "react";
import Header from "../components/header/page";
import Footer from "../components/footer/page";

const Volunteer = () => {
  useEffect(() => {
    // Dynamically load the Tally embed script safely
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.onload = () => {
      // Use window.Tally to match the global declaration and avoid TS errors
      if (typeof window !== 'undefined' && typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Header variant="solid" />
      <main className="min-h-screen bg-[#fafafa] flex flex-col items-center py-32 px-4">
        <div className="max-w-3xl w-full text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Volunteer with Zu’s Foundation
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Join us in supporting families raising children with special needs.
            Share your time, skills, and compassion — every helping hand counts.
          </p>
        </div>

        <div className="w-full max-w-2xl shadow-lg rounded-2xl overflow-hidden bg-white p-4">
          <iframe
            data-tally-src="https://tally.so/embed/3E4YAL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
            loading="lazy"
            width="100%"
            height="800"
            className="rounded-xl border-none"
            title="Volunteer — Zu's Foundation"
          ></iframe>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Volunteer;
