'use client';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ✅ Import shared animation config
import { 
  containerVariants, 
  fadeInLeft, 
  fadeInRight, 
  viewportSettings 
} from "@/lib/utils/motionConfig";

type StorySectionProps = {
  title: string,
  content: string
}

const StorySection = ({ title, content }: StorySectionProps) => {
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: viewportSettings.once, amount: 0.4 });

  return (
    <section className="pt-12 py-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        className="max-w-[1200px] m-auto px-5 flex items-start justify-between max-[850px]:flex-col max-[850px]:gap-8"
      >
        {/* Left Label */}
        <motion.p 
          variants={fadeInLeft}
          className="text-base font-medium text-gray-600 uppercase tracking-wide"
        >
          {title}
        </motion.p>
        
        {/* Right Content */}
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
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            viewport={viewportSettings}
            className="inline-block text-3xl max-[850px]:text-xl"
            style={{
              color: isInView ? "#404040" : "#737373"
            }}
          >
            {Array.isArray(content) 
          ? content.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          : <p>{content}</p>}
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;