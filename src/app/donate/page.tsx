'use client';
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Header from "../components/header/page";
import Footer from "../components/footer/page";
import DonationCard from "../components/card/donationCard/page";
import {
  containerVariants,
  fadeInUp,
  fadeInRight,
  fadeInLeft,
  cardVariants as configCardVariants,
  viewportSettings,
} from "@/lib/utils/motionConfig";

const Donate = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });

  const WhyDonate = [
    { number: "01", title: "Direct Impact on Children", description: "Your donation provides immediate support..." },
    { number: "02", title: "Empowering Families", description: "We connect families with resources..." },
    { number: "03", title: "Building Awareness", description: "Your contribution helps us educate communities..." },
    { number: "04", title: "100% Transparency", description: "Every dollar goes directly to programs..." },
  ];

  const impactStats = [
    { number: "100+", label: "Children Supported" },
    { number: "50+", label: "Families Reached" },
    { number: "5+", label: "Countries Active" },
    { number: "100%", label: "Volunteer Run" },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <Header variant="solid" />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-52 pb-12 bg-gradient-to-b from-gray-50 to-white max-[768px]:pt-32">
          <div className="max-w-[1230px] m-auto px-6 flex flex-col items-center">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" viewport={viewportSettings} className="inline-block mb-6 px-6 py-2 bg-green-100 rounded-full">
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Make a Difference Today</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportSettings} className="text-4xl md:text-6xl font-bold pb-8 text-center max-w-[900px] text-gray-900">
              Every Child Deserves a Chance
            </motion.h1>

            <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportSettings} className="text-lg text-gray-600 text-center max-w-[700px] mb-12">
              Your generosity creates opportunities for children with special needs across Africa. Together, we can build a brighter future.
            </motion.p>

            <motion.figure variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportSettings} className="w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-photo-4568739.jpeg"
                alt="African child"
                width={1200}
                height={600}
                unoptimized
                priority
                className="w-full h-full object-cover"
              />
            </motion.figure>
          </div>
        </section>

        {/* Why Donate */}
        <section className="pt-20">
          <motion.div ref={sectionRef} variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportSettings} className="max-w-[1230px] m-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
              <motion.h2 ref={headingRef} variants={fadeInLeft} className="text-4xl md:text-5xl font-bold text-left transition-colors duration-700 lg:max-w-[400px]" style={{ color: isHeadingInView ? "#1f2937" : "#9ca3af" }}>
                Why Donate?
              </motion.h2>
              <motion.p variants={fadeInRight} className="max-w-[600px] text-lg leading-relaxed text-gray-700">
                Zirachi Foundation donation program is a vital part of our mission to support children with special needs across Africa. By donating, you change the lives of children out there — in other words, <span className="font-bold text-green-700">you save a life.</span>
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Why Donate Cards */}
        <section className="py-12 bg-gray-50">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={viewportSettings} className="max-w-[1230px] m-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {WhyDonate.map((item, index) => (
              <motion.div key={index} variants={configCardVariants} whileHover={{ y: -10, scale: 1.02 }} className="bg-white p-8 rounded-[24px] border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-semibold text-black">{item.number}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Impact Stats */}
        <section className="py-20 bg-green-950">
          <motion.div className="max-w-[1200px] m-auto px-5 text-center">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact So Far</motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-green-200 mb-12 max-w-[700px] mx-auto">Thanks to donors like you, we&apos;re making real change happen across Africa</motion.p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <motion.div key={index} variants={configCardVariants} whileHover={{ scale: 1.05, y: -5 }} className="p-8 rounded-2xl shadow-xl">
                  <div className="text-5xl font-semibold text-white mb-2 max-[768px]:text-3xl">{stat.number}</div>
                  <div className="text-sm text-white/90 font-semibold uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <DonationCard />
        <div className="py-8"></div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
