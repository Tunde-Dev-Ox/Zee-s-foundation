"use client";
import { useEffect } from "react";
import Link from "next/link";
// @ts-expect-error: no types available for canvas-confetti
import confetti from "canvas-confetti";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
import { CiSquareCheck } from "react-icons/ci";

const SuccessPage = () => {
  useEffect(() => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#9bdd55", "#ffffff", "#4b7b2d"],
    });
  }, []);

  return (
    <>
    <Header variant='solid' />
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-center px-5 relative overflow-hidden">
      <div className="bg-white p-10 max-w-lg w-full z-10">
        <div className="flex justify-center mb-6">
            <CiSquareCheck className="text-6xl text-gray-400"/>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Thank You for Your Kindness
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
            className="bg-[#9bdd55] text-white py-3 px-6 rounded-[24px] font-medium hover:bg-[#89cc4e] transition-all duration-300"
          >
            Back to Home
          </Link>

          <Link
            href="/community"
            className="text-green-700 underline hover:text-green-800"
          >
            Join our community of supporters
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
};

export default SuccessPage;
