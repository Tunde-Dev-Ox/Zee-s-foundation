'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProblemSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: false, amount: 0.8 });

  const problems = [
    {
      number: "01",
      title: "Lack of Awareness",
      description: "Many parents have never heard of autism, Down syndrome, or cerebral palsy — leaving children undiagnosed and misunderstood for years.",
      icon: "👁️"
    },
    {
      number: "02",
      title: "Limited Access to Care",
      description: "Quality therapies, diagnosis centers, and inclusive schools are often out of reach — especially for families in rural or low-income areas.",
      icon: "🏥"
    },
    {
      number: "03",
      title: "Cultural Stigma",
      description: "Too many families face shame, blame, or even abandonment because of outdated beliefs about special needs.",
      icon: "💔"
    },
    {
      number: "04",
      title: "Isolation",
      description: "Without community or guidance, many parents feel alone and powerless, unsure where to turn for help or understanding.",
      icon: "🤝"
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
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
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
    <section ref={sectionRef} className="bg-gradient-to-b from-white via-red-50/20 to-white pt-10-">
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
            className="inline-block mb-4 px-6 py-2 bg-red-100 rounded-full"
          >
            <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">
              The Challenge
            </span>
          </motion.div>

          <h3 
            className={`text-5xl mb-8 font-bold max-[768px]:text-4xl transition-colors duration-700"
            ${isHeadingInView ? "#1f2937" : "#9ca3af"
            }`}
          >
            The Problem
          </h3>

          <motion.p 
            variants={headingVariants}
            className="text-lg mb-16 text-gray-700 max-w-[800px] mx-auto leading-relaxed font-medium"
          >
            Across Africa, countless families raising children with special needs
            face overwhelming barriers — <span className="text-red-600 font-semibold">emotional, social, and systemic.</span>
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
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-green-950 to-green-900 p-8 text-white rounded-2xl shadow-lg relative overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#9bdd55]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#9bdd55]/10 rounded-bl-full" />

              {/* Content */}
              <div className="relative z-10">
                {/* Number */}
                <motion.span 
                  className="text-4xl font-bold mb-6 inline-block text-[#9bdd55]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {problem.number}
                </motion.span>

                {/* Title */}
                <motion.h4 
                  className="text-xl mb-4 text-[#9bdd55] font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {problem.title}
                </motion.h4>

                {/* Description */}
                <motion.p 
                  className="text-zinc-300 text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {problem.description}
                </motion.p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-[#9bdd55]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: false }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-700 font-medium mb-6">
            But there&apos;s hope. <span className="text-green-700 font-bold">We&apos;re here to change this.</span>
          </p>
          <motion.div
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;