"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import {
  fadeInUp,
  cardVariants,
  containerVariants,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const teamMembers = [
  {
    id: 1,
    name: "Emayak Ochonogor",
    role: "Founder & CEO",
    image: "https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/emayak.jpg",
    about:
      "Emayak leads the with passion and vision, focusing on creating inclusive programs for children with special needs across Africa. She is dedicated to advocacy and empowerment. A woman who has a child with down syndrome herself, she brings personal experience and unwavering commitment to the organization's mission.",
  },
  {
    id: 3,
    name: "Joseph Olatunde",
    role: "IT Specialist",
    image: "https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/1737223588703.jpeg",
    about:
      "A product manager and developer with a passion for leveraging technology to create impactful solutions for non-profits. Joseph manages the organization's digital platforms and IT infrastructure.",
  },
];

const TheTeamPage = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "auto";
  }, [selectedMember]);

  const modalVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      <Header variant="solid" />

      <main id="main-content" className="bg-white">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          viewport={viewportSettings}
          variants={containerVariants}
          className="flex flex-col justify-center items-center max-w-[1200px] mx-auto pt-52 px-5 bg-gradient-to-b from-gray-50 to-white max-[768px]:pt-32"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
          >
            Meet The Team
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-3xl text-center text-gray-700 leading-relaxed"
          >
            Our dedicated team is passionate about making a difference in the
            lives of children with special needs and their families. With
            diverse backgrounds in education, healthcare, and advocacy, we bring
            a wealth of experience and compassion to our mission.
          </motion.p>
        </motion.section>

        {/* Team Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          viewport={viewportSettings}
          variants={containerVariants}
          className="py-20"
        >
          <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedMember(member)}
                className="cursor-pointer bg-white  flex flex-col items-start group"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-[200px] group-hover:opacity-90 transition-all"
                />
                <div className="p-4">
                  <h3 className="text-lg font-extrabold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Modal Drawer */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            />

            {/* Drawer */}
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed z-50 bg-white shadow-2xl rounded-t-3xl md:rounded-l-3xl p-8 w-full md:w-[420px] md:h-full bottom-0 right-0 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedMember.name}
                  </h2>
                  <p className="text-gray-500">{selectedMember.role}</p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="flex flex-col items-start overflow-y-auto">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={250}
                  height={250}
                  className="rounded-2xl mb-6 min-h-[300px] w-full"
                />
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.about}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TheTeamPage;
