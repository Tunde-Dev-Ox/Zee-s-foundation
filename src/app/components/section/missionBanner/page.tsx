"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  fadeInUp,
  fadeInRight,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const MissionBanner = () => {
  return (
    <motion.section
      className="pt-12 pb-[8rem]"
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
    >
      <div className="px-5">
        <motion.div
          variants={fadeInRight}
          className="relative max-w-[1200px] m-auto px-5 py-16 text-center rounded-[24px] h-[300px] overflow-hidden"
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0.8 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={viewportSettings}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-pnw-prod-7328070.jpg"
              width={100}
              height={100}
              alt="banner"
              unoptimized
              priority
              className="w-full h-full object-cover rounded-[24px]"
            />
          </motion.div>

          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-black/50 rounded-[24px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start justify-center">
            <motion.h3
              variants={fadeInUp}
              className="text-white text-3xl mb-5 text-left leading-snug max-w-[600px]"
            >
              Ready to help us on our mission?
            </motion.h3>

            <motion.button
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#eeeded",
                color: "#000",
                borderColor: "#eeeded",
              }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white py-2 px-6 rounded-[24px] text-white font-semibold text-lg transition-all duration-700"
            >
              <Link href="/volunteer">Volunteer</Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MissionBanner;
