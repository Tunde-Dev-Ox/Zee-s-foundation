"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  useEffect(() => {
    // One-time confetti burst on page load
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#9bdd55", "#ffffff", "#4b7b2d"],
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-center px-6 relative overflow-hidden">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full z-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/checkmark.gif"
            alt="Success"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Thank You for Your Kindness ❤️
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Your donation will directly support families raising children with
          special needs across Africa.  
          Because of you, another child will get the care, hope, and opportunity
          they deserve.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="bg-[#9bdd55] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#89cc4e] transition-all duration-300"
          >
            Back to Home
          </Link>

          <Link
            href="/community"
            className="text-green-700 underline hover:text-green-800"
          >
            Join our community of supporters →
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} Zee&apos;s Foundation. All rights reserved.
      </footer>
    </main>
  );
};

export default SuccessPage;
