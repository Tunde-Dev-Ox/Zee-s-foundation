'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HelpSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });

  const solutions = [
    {
      number: "01",
      title: "Awareness Campaigns",
      description: "We amplify stories, organize workshops, and share educational content that help communities better understand special needs."
    },
    {
      number: "02",
      title: "Child development",
      description: "We provide resources, guidance, and support to help children with special needs reach their full potential in learning, growth, and social skills."
    },
    {
      number: "03",
      title: "Resources & Tools",
      description: "From diagnosis checklists to therapy guides, we make practical, localized resources freely available to all families."
    },
    {
      number: "04",
      title: "Community",
      description: "We create safe online and offline spaces where parents share stories, find strength, and celebrate their children's growth together."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
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

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-gray-50 via-green-50/30 to-gray-50 pt-10">
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        {/* Header */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={headingVariants}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-6 py-2 bg-green-100 rounded-full"
          >
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
              Our Solution
            </span>
          </motion.div>

          <h3 className={`text-5xl mb-8 font-bold max-[768px]:text-4xl transition-colors duration-700 ${isHeadingInView ? "text-gray-800" : "text-gray-400"}`}>
            How We Help
          </h3>

          <motion.p 
            variants={headingVariants}
            className="text-lg mb-16 text-gray-700 max-w-[800px] mx-auto leading-relaxed font-medium"
          >
            We&apos;re building a network of awareness, hope, and empowerment — 
            giving every child a chance to thrive, and every parent a{" "}
            <span className="text-green-700 font-semibold">reason to believe again.</span>
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(155, 221, 85, 0.4)",
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-[#9bdd55] to-[#85c83f] p-8 text-black rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-950/10 rounded-bl-full" />

              {/* Content */}
              <div className="relative z-10">
                {/* Number */}
                <motion.span 
                  className="text-4xl font-bold mb-6 inline-block text-green-950"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {solution.number}
                </motion.span>

                {/* Title */}
                <motion.h4 
                  className="text-xl mb-4 font-bold text-green-950"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {solution.title}
                </motion.h4>

                {/* Description */}
                <motion.p 
                  className="text-gray-800 text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {solution.description}
                </motion.p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-green-950"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: false }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-700 font-medium">
            Together, we&apos;re creating a future where{" "}
            <span className="text-green-700 font-bold">no family feels alone.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HelpSection;