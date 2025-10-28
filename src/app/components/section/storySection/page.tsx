'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const StorySection = () => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, amount: 0.4 });

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const fadeInLeft = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const fadeInRight = {
    hidden: { 
      opacity: 0, 
      x: 40 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
      }
    }
  };

  return (
    <section className="pt-12 py-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-[1200px] m-auto px-5 flex items-start justify-between max-[850px]:flex-col max-[850px]:gap-8"
      >
        <motion.p 
          variants={fadeInLeft}
          className="text-base font-medium text-gray-600 uppercase tracking-wide"
        >
          Our story
        </motion.p>
        
        <motion.div
          ref={contentRef}
          variants={fadeInRight}
          className="text-4xl max-w-[700px] font-medium max-[850px]:text-2xl max-[850px]:w-full leading-relaxed transition-colors duration-700"
          style={{
            color: isInView ? "#000000" : "#737373"
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: false }}
            className="inline-block text-3xl max-[850px]:text-xl"
            style={{
              color: isInView ? "#404040" : "#737373"
            }}
          >
            Zee&apos;s Foundation&apos;s mission is to empower families raising children with special needs across Africa.<br /><br />
            We provide critical resources, support networks, and educational guidance, ensuring families have the tools they need to help their children thrive. Our 100% volunteer-run organization connects parents, caregivers, and professionals, all while creating inclusive communities where every child&apos;s story is valued and celebrated.
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;