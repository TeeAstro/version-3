"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { colourSlug } from "@/utils/catalog";
import { cx } from "@/utils/format";
import type { Product } from "@/utils/types";

/**
 * The thobe in all five colours, side by side. On desktop the panel under
 * the pointer widens; on phones the panels scroll sideways.
 */
export function ColourStrip({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:gap-4 md:overflow-visible md:px-0"
      onMouseLeave={() => setActive(0)}
    >
      {product.colours.map((colour, index) => (
        <Link
          key={colour.name}
          href={`/products/${product.slug}?colour=${colourSlug(colour.name)}`}
          onMouseEnter={() => setActive(index)}
          onFocus={() => setActive(index)}
          className={cx(
            "group flex w-[58vw] shrink-0 snap-center flex-col transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-auto md:min-w-0 md:shrink",
            active === index ? "md:grow-[2.4]" : "md:grow",
          )}
          style={{ flexBasis: 0 }}
        >
          <div className="relative h-[72svh] max-h-[46rem] min-h-[26rem] overflow-hidden bg-[#c4c2c3]">
            <Image
              src={colour.fullLength ?? (colour.images ?? product.images)[0]}
              alt={`${product.name} in ${colour.name}`}
              fill
              sizes="(min-width: 768px) 35vw, 60vw"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-4 flex items-center gap-2.5">
            <span className="size-2.5 rounded-full border border-ink/15" style={{ backgroundColor: colour.hex }} />
            <span className={cx("transition-colors", active === index ? "text-ink" : "text-muted")}>{colour.name}</span>
          </p>
        </Link>
      ))}
    </div>
  );
}
