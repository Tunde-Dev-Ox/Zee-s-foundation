'use client';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  containerVariants,
  fadeInUp,
  fadeInRight,
  cardVariants,
  viewportSettings
} from "@/lib/utils/motionConfig";

const FounderStorySection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const isHeadingInView = useInView(headingRef, { once: viewportSettings.once, amount: 0.8 });
  const isTextInView = useInView(textRef, { once: viewportSettings.once, amount: 0.5 });
  
  const handlePlayClick = () => {
    setIsPlaying(true);
    // Trigger autoplay by updating iframe src
    if (videoIframeRef.current) {
      const currentSrc = videoIframeRef.current.src;
      if (!currentSrc.includes('autoplay=1')) {
        videoIframeRef.current.src = currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=0';
      }
    }
  };

  return (
    <section ref={sectionRef} className="pt-12 pb-20 bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[1200px] m-auto px-5 pt-10 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-block mb-6 px-6 py-2 bg-green-100 rounded-full"
        >
          <span className="text-sm font-semibold text-green-800 uppercase tracking-wide">
            Our Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h3
          ref={headingRef}
          variants={fadeInUp}
          className="text-5xl font-bold mb-8 max-w-[800px] m-auto transition-colors duration-700 max-[768px]:text-4xl"
          style={{
            color: isHeadingInView ? "#14532d" : "#9ca3af",
          }}
        >
          Founder&apos;s Story
        </motion.h3>

        {/* Description */}
        <motion.p
          ref={textRef}
          variants={fadeInUp}
          className="text-lg mb-12 max-w-[800px] m-auto leading-relaxed transition-colors duration-700"
          style={{
            color: isTextInView ? "#374151" : "#9ca3af",
          }}
        >
          Founded in 2025 by{" "}
          <span className="font-semibold text-green-700">Emayak Ochonogor</span>, a mother of a child with special needs, Zee&apos;s Foundation was born out of her struggle to find support and resources in her community. Determined to make a difference, she created this platform to connect families, share stories, and provide resources. Today, Zee&apos;s Foundation is growing rapidly across Africa — all united by the belief that{" "}
          <span className="font-bold text-green-700">
            every child&apos;s story deserves to be told.
          </span>
        </motion.p>

        {/* Video Section */}
        <motion.div variants={cardVariants} className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative group"
          >
            {/* Modern gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-600 to-green-800 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border border-gray-700/50">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none z-10"></div>
              
              <div className="relative aspect-video bg-black">
                {/* Custom play button overlay - shows before interaction */}
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isPlaying ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handlePlayClick}
                    className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-20 flex items-center justify-center cursor-pointer group/play"
                  >
                    {/* Animated play button */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse"></div>
                      
                      {/* Play button */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm group-hover/play:from-green-400 group-hover/play:to-green-600 group-hover/play:scale-110 transition-all duration-300">
                        <svg
                          className="w-10 h-10 text-white ml-1 drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Video title overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-left z-30">
                      <p className="text-white text-sm font-medium mb-1 opacity-90">Founder&apos;s Story</p>
                      <p className="text-white text-xs opacity-70">Click to play video</p>
                    </div>
                  </motion.div>
                )}

                {/* YouTube iframe - enhanced with parameters to hide UI elements */}
                <iframe
                  ref={videoIframeRef}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/3r_Ri9aRYAI?si=sw11y3VBNg7Z30ZH&modestbranding=1&rel=0&showinfo=0&controls=1&color=white&theme=dark&iv_load_policy=3&playsinline=1"
                  title="Mum's Special Stories - Our Journey"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-sm text-gray-600 italic text-center"
          >
            Watch Emayak share her inspiring journey and vision for Zee&apos;s Foundation
          </motion.p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={fadeInRight}
          className="mt-16 flex flex-wrap justify-center gap-8 max-[768px]:gap-6"
        >
          {[
            { number: "2025", label: "Founded" },
            { number: "5+", label: "Countries" },
            { number: "1000+", label: "Families" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center min-w-[120px]"
            >
              <div className="text-4xl font-bold text-green-700 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FounderStorySection;
