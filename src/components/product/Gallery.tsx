"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cx } from "@/utils/format";

/**
 * One large photograph at a time, with arrows, a counter and thumbnails.
 * Swipe sideways on touch screens. Give it a `key` per colour so it resets.
 */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  return (
    <div>
      <div className="group relative aspect-[4/5] overflow-hidden bg-parchment">
        <AnimatePresence initial={false}>
          <motion.div
            key={images[index]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              if (info.offset.x > 60) go(-1);
            }}
          >
            <Image
              src={images[index]}
              alt={`${name}, image ${index + 1} of ${count}`}
              fill
              priority
              draggable={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-ivory/85 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
            >
              <ChevronLeft size={18} strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-ivory/85 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
            >
              <ChevronRight size={18} strokeWidth={1.25} />
            </button>
            <p className="t-small absolute bottom-3 right-3 bg-ivory/85 px-2.5 py-1 tabular-nums">
              {index + 1} / {count}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-3 flex gap-3" aria-label="Images">
          {images.map((src, i) => (
            <li key={src} className="w-16 md:w-20">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cx(
                  "relative block aspect-[4/5] w-full overflow-hidden bg-parchment transition-opacity",
                  i === index ? "opacity-100 shadow-[0_0_0_1px_var(--color-ink)]" : "opacity-55 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
