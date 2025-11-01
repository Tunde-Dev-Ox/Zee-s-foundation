"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import Image from "next/image";
import {
  containerVariants,
  fadeInUp,
} from "@/lib/utils/motionConfig";

const BecomeAMember = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.onload = () => {
      if (typeof window !== "undefined" && typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Header variant="solid" />

      <motion.main
        id="main-content"
        className="min-h-screen flex flex-col items-center py-52 px-5 overflow-x-hidden relative max-[768px]:pt-32 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden rounded-[24px]"
          variants={fadeInUp}
        >
          <Image
            src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-photo-7328428.jpeg"
            alt="Become a Member Banner"
            width={100}
            height={100}
            unoptimized
            priority
            className="w-full h-full object-cover rounded-[24px]"
          />
          <div className="absolute inset-0 bg-black/40 rounded-[24px]" />
        </motion.div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-[1200px] w-full text-center">
          {/* Badge */}
          <motion.div
            className="inline-block mb-6 px-6 py-2 bg-green-100 rounded-full"
            variants={fadeInUp}
          >
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Join Our Community
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Become a Member of Zee&apos;s Foundation
          </motion.h1>

          <motion.p
            className="text-white text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            variants={fadeInUp}
          >
            Join the fastest growing community for children with special needs across Africa. 
            Connect with other families, access exclusive resources, and be part of meaningful change.
          </motion.p>

          <motion.div
            className="w-full max-w-2xl shadow-xl rounded-3xl overflow-hidden bg-white p-6 mx-auto"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <iframe
              data-tally-src="https://tally.so/embed/mVRKDl?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1"
              loading="lazy"
              width="100%"
              height="800"
              className="rounded-xl border-none"
              title="Become a Member — Zee's Foundation"
            ></iframe>
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </>
  );
};

export default BecomeAMember;

