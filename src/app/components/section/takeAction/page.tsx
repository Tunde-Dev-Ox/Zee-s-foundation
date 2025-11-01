"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  containerVariants,
  fadeInUp,
  cardVariants,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const TakeAction = () => {
  const cards = [
    {
      title: "Donate",
      desc: "Your financial support helps us provide resources, support groups, and advocacy for families in need.",
      btn: "Donate Now",
      href: "/donate",
    },
    {
      title: "Volunteer",
      desc: "Share your time and skills to help us organize events, manage support groups, and spread awareness.",
      btn: "Join Us",
      href: "/volunteer",
    },
    {
      title: "Become a Member",
      desc: "Join the fastest growing community for children with special needs across Africa. Let's make the world a better place.",
      btn: "Sign Up",
      href: "/become-a-member",
    },
  ];

  return (
    <section className="pt-12 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[1200px] m-auto px-5 py-16 text-center"
      >
        {/* Header */}
        <motion.h3
          variants={fadeInUp}
          className="text-5xl font-bold mb-6 max-w-[800px] m-auto text-gray-900 max-[768px]:text-4xl"
        >
          Ready to take action?
        </motion.h3>

        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-600 mb-14 max-w-[600px] m-auto"
        >
          Join us in making a difference. Here are some ways you can help:
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[950px] m-auto"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 70, damping: 16 }}
              className="bg-green-950 text-white p-8 rounded-[24px] shadow-xl transition-all duration-500"
            >
              <motion.h4
                variants={fadeInUp}
                className="text-2xl font-semibold mb-4 text-white"
              >
                {card.title}
              </motion.h4>
              <motion.p
                variants={fadeInUp}
                className="text-base text-[#c5c3c3] mb-6 leading-relaxed"
              >
                {card.desc}
              </motion.p>
              <Link href={card.href}>
                <button
                  className="py-3 px-8 rounded-full border-2 border-white text-white font-semibold text-[16px] hover:bg-[#f2f2f2] hover:text-green-950 transition-all duration-500 cursor-pointer"
                >
                  {card.btn}
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TakeAction;
