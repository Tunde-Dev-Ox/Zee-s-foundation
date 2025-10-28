'use client';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const MapSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.5 });

  // Parallax effect for map
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const mapY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const mapScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      }
    }
  };

  const numberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotateY: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 80,
        duration: 1,
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="pt-12 overflow-hidden pb-0 max-[768px]:pt-26 relative bg-gradient-to-b from-white via-green-50/30 to-white"
    >
      <motion.div 
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10 max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center pt-[10rem] pb-[10rem] max-[768px]:py-0 max-[768px]:text-left max-[768px]:items-start"
      >
        {/* Animated number badge */}
        <motion.div
          variants={numberVariants}
          className="mb-6 px-6 py-2 bg-[#9bdd55] rounded-full shadow-lg"
        >
          <motion.span 
            className="text-base font-semibold text-green-900"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            5+ Countries
          </motion.span>
        </motion.div>

        <motion.h2 
          variants={fadeInUp}
          className="text-5xl sm:text-7xl font-bold mb-6 text-gray-900 max-[768px]:text-4xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block"
          >
            Over 5 African
          </motion.span>
          {" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
          >
            Countries
          </motion.span>
        </motion.h2>

        <motion.p 
          variants={fadeInUp}
          className="text-lg sm:text-xl text-gray-700 mb-10 max-w-[600px] leading-relaxed"
        >
          We operate across Africa — empowering families and transforming lives,{" "}
          <span className="font-semibold text-green-800">one family at a time.</span>
        </motion.p>

        {/* Stats cards */}
        <motion.div
          variants={fadeInUp}
          className="flex gap-6 mb-10 max-[768px]:flex-col max-[768px]:w-full"
        >
          {[
            { number: "100+", label: "Families Supported" },
            { number: "10+", label: "Active Volunteers" },
            { number: "100%", label: "Community Driven" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              className="bg-white px-6 py-4 rounded-2xl shadow-lg border border-green-100 min-w-[140px]"
            >
              <div className="text-3xl font-bold text-green-700">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <Link href="/volunteer" className="w-full sm:w-auto">
          <motion.button
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#9bdd55",
              borderColor: "#9bdd55",
              boxShadow: "0 10px 30px rgba(155, 221, 85, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer py-3 px-10 text-black font-semibold text-lg border-2 border-gray-300 rounded-full shadow-md transition-all duration-300 hover:text-green-900"
          >
            Volunteer
          </motion.button>
        </Link>

        {/* Animated map with parallax */}
        <motion.div 
          style={{ 
            y: mapY,
            scale: mapScale,
            opacity: mapOpacity
          }}
          className="h-full -z-[1] w-full absolute top-0 left-0 right-0 bottom-0 max-[768px]:relative max-[768px]:mt-12 max-[768px]:h-[400px] pointer-events-none"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="/map.webp" 
            alt="African countries map" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
          
          {/* Animated pulse dots on map */}
          {[
            { top: "30%", left: "45%" },
            { top: "50%", left: "52%" },
            { top: "65%", left: "48%" },
            { top: "42%", left: "58%" },
            { top: "55%", left: "43%" }
          ].map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              className="absolute w-4 h-4 bg-green-500 rounded-full"
              style={{ top: position.top, left: position.left }}
            >
              <motion.div
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                className="absolute inset-0 bg-green-400 rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapSection;