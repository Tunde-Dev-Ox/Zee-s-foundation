'use client';
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // slower cascade
        delayChildren: 0.5,
      }
    }
  };

  // Word animations
  const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    show: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 18,     // smoother
        stiffness: 70,   // less snappy
        duration: 1.3,
      }
    }
  };

  // Subline effect
  const sublineVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 60,
        duration: 1.5,
        delay: 0.1,
      }
    }
  };

  // Paragraph
  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1.3,
      }
    }
  };

  // Button
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
        delay: 1.2,
        duration: 1.5,
      }
    }
  };

  return (
    <section className="relative h-screen pt-[4rem] overflow-hidden max-[768px]:pt-0">
      {/* Video Background */}
      <video
        src="https://qkfncm5e7gfdvlw8.public.blob.vercel-storage.com/6323333-uhd_3840_2160_25fps.mp4"
        muted
        autoPlay
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none"
      />

      {/* Content */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-start justify-center h-full text-white max-w-[1200px] m-auto py-4 px-5"
      >
        <h1 className="text-5xl md:text-[4rem] font-[900] mb-6 leading-tight max-w-[750px]">
          <div className="mb-2 flex flex-wrap">
            {["Every", "Child's", "Story"].map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-3"
                style={{ transformOrigin: "top" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="text-[#9bdd55] flex flex-wrap">
            {["Deserves", "to", "be", "Told."].map((word, i) => (
              <motion.span
                key={i}
                variants={sublineVariants}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </h1>

        <motion.p 
          variants={textVariants}
          className="text-[18px] mb-8 max-w-[600px] leading-relaxed"
        >
          Empowering children with special needs across Africa with stories, resources, and unwavering care.
        </motion.p>

        <motion.button
          variants={buttonVariants}
          whileHover={{ 
            scale: 1.07,
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
          whileTap={{ scale: 0.96 }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }
          }}
          className="border-2 border-white rounded-[24px] cursor-pointer py-2 px-9 text-white font-semibold text-[18px] backdrop-blur-sm shadow-lg transition-colors duration-500"
        >
          <Link href="/donate">
            Donate now
          </Link>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
