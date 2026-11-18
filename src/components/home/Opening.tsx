"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mark } from "@/components/ui/Logo";

const ease = [0.76, 0, 0.24, 1] as const;

// Plays on each full page load, not when navigating back to the homepage.
let played = false;

/**
 * The opening: the calligraphic mark is written right to left on oxblood,
 * then the oxblood parts like two doors onto the photograph.
 */
export function Opening() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => !played);

  useEffect(() => {
    played = true;
    if (!show) return;
    const timer = window.setTimeout(() => setShow(false), 3200);
    return () => window.clearTimeout(timer);
  }, [show]);

  if (!show || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-oxblood"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.15, delay: 1.85, ease }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-oxblood"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.15, delay: 1.85, ease }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center text-blush"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.6 }}
      >
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Mark className="w-44 md:w-64" />
        </motion.div>
      </motion.div>
    </div>
  );
}
