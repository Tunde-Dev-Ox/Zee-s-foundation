"use client";
import Link from "next/link";
import Image from "next/image";

const CancelPage = () => {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] text-center px-6">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <Image
            src="/cancel.png"
            alt="Donation canceled"
            width={90}
            height={90}
            className="rounded-full opacity-80"
          />
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Donation Canceled
        </h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          We noticed you didn&apos;t complete your donation.  
          That&apos;s okay — your willingness to help already means a lot ❤️  
          If you&apos;d like, you can try again whenever you&apos;re ready.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/donate"
            className="bg-[#9bdd55] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#8ac84d] transition-all duration-300"
          >
            Try Again
          </Link>

          <Link
            href="/about"
            className="text-green-700 underline hover:text-green-800"
          >
            Learn more about Zirachi Foundation →
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Zirachi Foundation. All rights reserved.
      </footer>
    </main>
  );
};

export default CancelPage;
