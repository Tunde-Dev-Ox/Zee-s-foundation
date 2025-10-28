"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Variants } from "framer-motion";

const TakeAction = () => {
    const actionVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number = 0) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.2,
            duration: 0.8,
            ease: "easeOut" as const,
          },
        }),
      };

  const cards = [
    {
      title: "Donate",
      desc: "Your financial support helps us provide resources, support groups, and advocacy for families in need.",
      btn: "Donate Now",
      href: "#",
    },
    {
      title: "Volunteer",
      desc: "Share your time and skills to help us organize events, manage support groups, and spread awareness.",
      btn: "Join Us",
      href: "/volunteer",
    },
    {
      title: "Become a member",
      desc: "Join the fastest growing community for children with special needs across Africa. Let's make the world a better place.",
      btn: "Sign Up",
      href: "#",
    },
  ];

  return (
    <motion.section
      className="pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // animates every time it's in view
    >
      <div className="max-w-[1200px] m-auto px-5 py-16 text-center">
        <motion.h3
          className="text-5xl font-semibold mb-8 max-w-[800px] m-auto"
          variants={actionVariants}
          custom={0}
        >
          Ready to take action?
        </motion.h3>

        <motion.p
          className="text-base mb-12 max-w-[600px] m-auto"
          variants={actionVariants}
          custom={0.5}
        >
          Join us in making a difference. Here are some ways you can help:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] m-auto">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-green-950 p-6 text-white rounded-lg"
              variants={actionVariants}
              custom={i + 1} // 👈 passes index for stagger
              whileInView="visible"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              <h4 className="text-2xl mb-4">{card.title}</h4>
              <p className="text-base mb-6 text-[#c5c3c3]">{card.desc}</p>
              <Link href={card.href}>
                <button className="cursor-pointer py-2 px-6 rounded-[24px] text-white font-medium text-[16px] border-2 border-white hover:bg-[#eeeded] hover:text-black duration-700">
                  {card.btn}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TakeAction;