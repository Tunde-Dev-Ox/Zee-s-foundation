"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
    },
  }),
};

const imageZoom = {
  hidden: { scale: 1.05, opacity: 0.8 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
    },
  },
};

const MissionBanner = () => {
  return (
    <motion.section
      className="pt-12 pb-[8rem]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} 
    >
      <div className="px-5">
        <div className="relative max-w-[1200px] m-auto px-5 py-16 text-center rounded-[24px] h-[300px] overflow-hidden">
          {/* Background Image */}
          <motion.div
            variants={imageZoom}
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
              className="text-white text-3xl mb-5 text-left"
              variants={fadeUp}
              custom={0}
            >
              Ready to help us on our mission?
            </motion.h3>

            <motion.button
              className="border-2 border-white py-2 px-6 rounded-[24px] text-white hover:bg-[#eeeded] hover:text-black duration-700"
              variants={fadeUp}
              custom={1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/volunteer">Volunteer</Link>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MissionBanner;
