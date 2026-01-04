'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// 🧩 Import shared animation configs
import {
  containerVariants,
  fadeInUp,
  fadeInRight,
  fadeInLeft,
  cardVariants,
  viewportSettings,
  baseTransition
} from "@/lib/utils/motionConfig";

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: viewportSettings.once, amount: 0.4 });

  return (
    <section ref={sectionRef} className="pt-16 pb-20 bg-gray-50 max-[768px]:pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[1200px] mx-auto flex justify-between items-center gap-12 px-5 max-[1000px]:flex-col-reverse"
      >
        {/* Left Image Side */}
        <motion.div
          variants={fadeInLeft}
          transition={baseTransition}
          className="relative flex-shrink-0 max-w-[500px] w-full"
        >
          <Image
            src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-photo-11369172.jpeg"
            alt="problem"
            unoptimized
            priority
            width={500}
            height={400}
            className="rounded-xl shadow-xl w-full h-[380px] object-cover"
          />
          <motion.div
            variants={cardVariants}
            transition={baseTransition}
            className="absolute -bottom-8 -right-8 bg-white p-5 rounded-2xl shadow-lg max-[1000px]:hidden"
          >
            <p className="text-sm text-gray-600 max-w-[220px] leading-relaxed">
              Many families lack access to proper resources and support for children with special needs.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Text Side */}
        <motion.div
          variants={fadeInRight}
          transition={baseTransition}
          ref={textRef}
          className="flex flex-col max-w-[600px] space-y-6 max-[1000px]:items-center max-[1000px]:text-center"
        >
          <motion.span
            variants={fadeInUp}
            transition={baseTransition}
            className="text-base font-medium text-gray-600"
          >
            The problem
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            transition={baseTransition}
            className="text-4xl font-semibold text-green-900 leading-snug max-[1000px]:text-3xl"
            style={{
              color: isInView ? "#14532d" : "#737373",
            }}
          >
            Limited awareness and fragmented support systems for children with special needs.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={baseTransition}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Across Africa, countless families struggle to find resources, guidance, and a sense of
            belonging for their children with special needs. This lack of awareness and connected
            community leaves parents feeling isolated and overwhelmed.
          </motion.p>

          <motion.button
            variants={fadeInUp}
            transition={baseTransition}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#9bdd55",
              borderColor: "#9bdd55",
              transition: baseTransition,
            }}
            whileTap={{ scale: 0.95 }}
            className="text-green-900 cursor-pointer py-2 px-9 font-semibold text-[18px] rounded-[24px] border-2 border-[#9bdd55] w-[40%] max-[1000px]:w-[70%] transition-all duration-300"
          >
            <Link href="/become-a-member">Become a member</Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProblemSection;
