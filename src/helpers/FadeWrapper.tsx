import { motion } from "framer-motion";
import React from "react";

export let easing = [0.175, 0.85, 0.42, 0.96];
export const backVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easing
    }
  },
  enter: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 1.5,
      ease: easing
    }
  }
};

interface Props {
  children: any;
  fadeIn?: boolean;
  overrides?: any;
}

const FadeWrapper = ({ children, overrides, fadeIn = true }: Props) => {
  return (
    <motion.div
      initial={fadeIn ? "exit" : "enter"}
      variants={{ ...backVariants, ...overrides }}
    >
      {children}
    </motion.div>
  );
};

export default FadeWrapper;
