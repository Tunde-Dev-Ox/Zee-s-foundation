'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FounderStorySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });
  const isTextInView = useInView(textRef, { once: false, amount: 0.5 });

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const videoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 80,
        delay: 0.3
      }
    }
  };

  return (
    <section ref={sectionRef} className="pt-12 pb-20 bg-white">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-[1200px] m-auto px-5 pt-10 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-block mb-6 px-6 py-2 bg-purple-100 rounded-full"
        >
          <span className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
            Our Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h3 
          ref={headingRef}
          variants={itemVariants}
          className="text-5xl font-bold mb-8 max-w-[800px] m-auto transition-colors duration-700 max-[768px]:text-4xl"
          style={{
            color: isHeadingInView ? "#1f2937" : "#9ca3af"
          }}
        >
          Founder&apos;s Story
        </motion.h3>

        {/* Description */}
        <motion.p 
          ref={textRef}
          variants={itemVariants}
          className="text-lg mb-12 max-w-[800px] m-auto leading-relaxed transition-colors duration-700"
          style={{
            color: isTextInView ? "#374151" : "#9ca3af"
          }}
        >
          Founded in 2025 by <span className="font-semibold text-green-700">Emayak Ochonogor</span>, a mother of a child with special needs, started Zee&apos;s Foundation after struggling to find support and resources in her community. Determined to make a difference, she created this platform to connect families, share stories, and provide much-needed resources. Today, Zee&apos;s foundation has just begun and growing rapidly, with members across Africa, all united by the belief that{" "}
          <span className="font-bold text-green-700">every child&apos;s story deserves to be told.</span>
        </motion.p>

        {/* Video Container */}
        <motion.div 
          variants={videoVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative p-1 rounded-2xl bg-gradient-to-br from-green-500 via-green-700 to-green-950 shadow-2xl"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              {/* Play button overlay effect */}
              <motion.div
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                >
                  <svg className="w-8 h-8 text-green-700 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </motion.div>
              </motion.div>

              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3r_Ri9aRYAI?si=sw11y3VBNg7Z30ZH" 
                title="Mum's Special Stories - Our Journey" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Video caption */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 text-sm text-gray-600 italic"
          >
            Watch Emayak share her inspiring journey and vision for Zee&apos;s Foundation
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: false }}
          className="mt-16 flex flex-wrap justify-center gap-8 max-[768px]:gap-6"
        >
          {[
            { number: "2025", label: "Founded" },
            { number: "5+", label: "Countries" },
            { number: "1000+", label: "Families" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
              className="text-center min-w-[120px]"
            >
              <div className="text-4xl font-bold text-green-700 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FounderStorySection;