'use client';
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "../components/header/page";
import MissionBanner from "../components/section/missionBanner/page";
import StorySection from "../components/section/storySection/page";
import Footer from "../components/footer/page";
import Image from "next/image";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaChildren } from "react-icons/fa6";

import {
  containerVariants,
  fadeInUp,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const OurMission = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });

  const missionPoints = [
    {
      title: "Support Families",
      desc: "We provide resources, guidance, and a community for families raising children with special needs, helping them thrive.",
      icon: <MdOutlineFamilyRestroom />
    },
    {
      title: "Raise Awareness",
      desc: "Our campaigns educate communities and break stigmas, fostering inclusion and understanding for every child.",
      icon: <HiSpeakerWave />
    },
    {
      title: "Empower Children",
      desc: "We create programs and initiatives that help children with special needs develop their talents, confidence, and independence.",
      icon: <FaChildren />
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <Header variant="solid" />

      <main id="main-content">
        {/* Hero Section */}
        <section className="pt-52 pb-20 bg-gradient-to-b from-gray-50 to-white max-[768px]:pt-32">
          <motion.div
            className="max-w-[1200px] m-auto px-5 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            viewport={viewportSettings}
          >
            <div className="inline-block mb-6 px-6 bg-green-100 rounded-full">
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Our Mission
              </span>
            </div>

            <motion.h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-colors duration-700"
              style={{
                color: isHeadingInView ? "#1f2937" : "#9ca3af",
              }}
              variants={fadeInUp}
            >
              Making a Difference Together
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 max-w-[700px] m-auto leading-relaxed mb-12"
              variants={fadeInUp}
            >
              Zee&apos;s Foundation is committed to creating a world where every child with special needs has the support, resources, and opportunities they deserve. Our mission guides every initiative, program, and partnership we take on.
            </motion.p>

            <motion.figure
              className="w-full rounded-3xl overflow-hidden shadow-2xl"
              variants={fadeInUp}
            >
              <Image
                src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-photo-7328428.jpeg"
                alt="Our mission banner"
                width={1200}
                height={600}
                unoptimized
                priority
                className="w-full h-full object-cover"
              />
            </motion.figure>
          </motion.div>
        </section>

        <StorySection 
           title="Our mission"
           content={`At Zee’s Foundation, we believe that every child’s story deserves to be told. Our mission is to empower children with special needs and their families across Africa by providing access to the tools, resources, and support they need to thrive. We are building a community where parents, caregivers, and children are not just seen—but celebrated—and where challenges are met with guidance, understanding, and hope. 
           Through awareness, education, and connection, we strive to break down barriers, challenge misconceptions, and create inclusive spaces where every child can grow, learn, and shine. Every program we run, every story we share, and every resource we provide is a step toward a world where no child is left behind and every family feels supported. Together, we are transforming lives, amplifying voices, and building a brighter, more compassionate future.`}
        />

        {/* Mission Points */}
        <section className="py-20">
          <motion.div
            ref={sectionRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-[1200px] m-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white p-8 rounded-[24px] flex items-center justify-center flex-col shadow-lg text-center transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4 text-center">{point.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <MissionBanner />
      </main>

      <Footer />
    </div>
  );
};

export default OurMission;