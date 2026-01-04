// lib/motionConfig.ts
import { Variants, Transition } from "framer-motion";

export const viewportSettings = {
  once: true, // only animate once when in view
  amount: 0.3, // how much of the section should be visible before triggering
};

export const baseTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1],
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: baseTransition.duration,
      type: "spring",
      damping: 22,
      stiffness: 80,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateY: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: baseTransition.duration,
      type: "spring" as const,
      damping: 18,
      stiffness: 70,
    },
  },
};

const fadeInLeftTransition: Transition = {
  duration: 1.1,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: fadeInLeftTransition,
  },
};