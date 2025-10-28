'use client';
import { motion, useScroll, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const MissionSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: false, amount: 0.5 });

  // Scroll-based color change (hook called without destructuring because scrollYProgress is unused)
  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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

  const fadeInRight = {
    hidden: { 
      opacity: 0, 
      x: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
      }
    }
  };

  return (
    <section ref={sectionRef} className="pt-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-[1200px] m-auto px-5 flex justify-between items-center bg-[url('/H9uRg9OcPpfpk6YCqCbyyTkAN14.png')] relative bg-no-repeat bg-cover bg-center max-[1000px]:flex-col py-16"
      >
        {/* Left Content */}
        <div className="flex flex-col max-w-[600px] max-[1000px]:mb-8 max-[1000px]:items-center">
          <motion.span 
            variants={fadeInUp}
            className="text-base mb-7 font-medium text-gray-600"
          >
            What we do
          </motion.span>
          
          <motion.p 
            ref={textRef}
            variants={fadeInUp}
            className="text-4xl font-semibold mb-9 leading-snug max-[1000px]:text-center max-[1000px]:text-3xl transition-colors duration-700"
            style={{
              color: isInView ? "#14532d" : "#737373"
            }}
          >
            Join us in our mission to providing a supportive platform for families of children with special needs across Africa.
          </motion.p>
          
          <motion.button 
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#9bdd55",
              borderColor: "#9bdd55",
            }}
            whileTap={{ scale: 0.95 }}
            className="text-green-900 cursor-pointer py-2 px-9 font-semibold text-[18px] rounded-[24px] border-2 border-[#9bdd55] w-[30%] max-[1000px]:w-[58%] transition-all duration-300"
          >
            <Link href="/">
              Our mission
            </Link>
          </motion.button>
        </div>

        {/* Right Card */}
        <motion.div 
          variants={fadeInRight}
          className="flex gap-6 max-w-[400px]"
        >
          <motion.div 
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            className="flex flex-col gap-3 bg-[#9bdd55] rounded-lg overflow-hidden shadow-lg transition-shadow duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Image 
                src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/pexels-pixabay-209728.jpg" 
                alt="community" 
                unoptimized 
                priority 
                width={400} 
                height={250} 
                className="w-full h-[250px] object-cover"
              />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl px-4 font-bold text-green-900"
            >
              Community Support
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base px-4 text-green-900/80 leading-relaxed"
            >
              Connect with other families, share experiences, and find emotional support in our inclusive community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ x: 5 }}
              className="px-4 mb-4"
            >
              <Link 
                href="#" 
                className="text-base font-semibold text-green-900 underline underline-offset-4 inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Learn more
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MissionSection;