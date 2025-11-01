'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// 🧩 Shared motion config
import {
  containerVariants,
  fadeInUp,
  cardVariants,
  viewportSettings,
  baseTransition
} from "@/lib/utils/motionConfig";

const HelpSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: viewportSettings.once, amount: 0.6 });

  const solutions = [
    {
      number: "01",
      title: "Awareness Campaigns",
      description:
        "We amplify stories, organize workshops, and share educational content that help communities better understand special needs.",
    },
    {
      number: "02",
      title: "Child Development",
      description:
        "We provide resources, guidance, and support to help children with special needs reach their full potential in learning, growth, and social skills.",
    },
    {
      number: "03",
      title: "Resources & Tools",
      description:
        "From diagnosis checklists to therapy guides, we make practical, localized resources freely available to all families.",
    },
    {
      number: "04",
      title: "Community",
      description:
        "We create safe online and offline spaces where parents share stories, find strength, and celebrate their children's growth together.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-gray-50 via-green-50/30 to-gray-50 pt-20 pb-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[1200px] mx-auto px-5 text-center"
      >
        {/* ====== HEADER ====== */}
        <motion.div
          ref={headingRef}
          variants={fadeInUp}
          transition={baseTransition}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeInUp}
            transition={baseTransition}
            className="inline-block mb-4 px-6 py-2 bg-green-100 rounded-full"
          >
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Our Solution
            </span>
          </motion.div>

          <motion.h3
            variants={fadeInUp}
            transition={baseTransition}
            className={`text-5xl font-bold mb-8 max-[768px]:text-4xl transition-colors duration-700 ${
              isHeadingInView ? "text-gray-900" : "text-gray-400"
            }`}
          >
            How we help
          </motion.h3>

          <motion.p
            variants={fadeInUp}
            transition={baseTransition}
            className="text-lg mb-16 text-gray-700 max-w-[800px] mx-auto leading-relaxed font-medium"
          >
            We&apos;re building a network of awareness, hope, and empowerment — giving every child
            a chance to thrive, and every parent a{" "}
            <span className="text-green-700 font-semibold">reason to believe again.</span>
          </motion.p>
        </motion.div>

        {/* ====== GRID ====== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={baseTransition}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
                transition: baseTransition,
              }}
              className="bg-gradient-to-br from-[#9bdd55] to-[#85c83f] p-4 text-black rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Subtle hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-950/10 rounded-bl-full" />

              {/* Text Content */}
              <div className="relative z-10 text-left max-[768px]:text-center">
                <motion.span
                  variants={fadeInUp}
                  transition={{
                    ...baseTransition,
                    delay: 0.2 + index * 0.1,
                  }}
                  className="text-4xl font-bold mb-6 inline-block text-green-950"
                >
                  {solution.number}
                </motion.span>

                <motion.h4
                  variants={fadeInUp}
                  transition={{
                    ...baseTransition,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="text-xl mb-4 font-bold text-green-950"
                >
                  {solution.title}
                </motion.h4>

                <motion.p
                  variants={fadeInUp}
                  transition={{
                    ...baseTransition,
                    delay: 0.4 + index * 0.1,
                  }}
                  className="text-gray-800 text-base leading-relaxed"
                >
                  {solution.description}
                </motion.p>
              </div>

              {/* Animated bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-green-950"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{
                  ...baseTransition,
                  delay: 0.5 + index * 0.1,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ====== BOTTOM MESSAGE ====== */}
        <motion.div
          variants={fadeInUp}
          transition={baseTransition}
          viewport={viewportSettings}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-700 font-medium">
            Together, we&apos;re creating a future where{" "}
            <span className="text-green-700 font-bold">no family feels alone.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HelpSection;
