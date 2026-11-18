"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

/** The desert photograph, framed like a print with an ivory margin. */
export function Hero() {
  return (
    <section className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative h-[calc(100svh-var(--header-h)-0.75rem)] min-h-[32rem] overflow-hidden bg-[#c9a27a] md:h-[calc(100svh-var(--header-h)-1.5rem)]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, delay: 1.7, ease }}
        >
          <Image
            src="/images/editorial/hero-desert.jpg"
            alt="A man in a white thobe walking alone across a sand dune"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_62%] md:object-[50%_47%]"
          />
        </motion.div>
        <div className="absolute inset-x-0 top-0 flex flex-col items-center px-6 pt-14 text-center text-ink md:pt-14">
          <motion.h1
            className="t-display italic"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.4, ease }}
          >
            Leave a trace.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <Link href="/shop" className="u-link u-link-on mt-6 inline-block">
              Shop the collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
