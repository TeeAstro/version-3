"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swatches } from "@/components/ui/Swatches";
import { colourSlug } from "@/utils/catalog";
import { cx, formatPrice } from "@/utils/format";
import type { Product } from "@/utils/types";

interface Props {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** A product with its colours. Hovering a swatch previews it; clicking chooses it. */
export function PieceTile({ product, sizes = "(min-width: 768px) 33vw, 100vw", priority, className }: Props) {
  const [chosen, setChosen] = useState(product.colours[0]);
  const [preview, setPreview] = useState<typeof chosen | null>(null);
  const shown = preview ?? chosen;
  const image = (shown.images ?? product.images)[0];
  const href = `/products/${product.slug}?colour=${colourSlug(chosen.name)}`;

  return (
    <article className={cx("text-center", className)}>
      <Link href={href} className="group block" aria-label={`${product.name} in ${chosen.name}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
          <AnimatePresence initial={false}>
            <motion.div
              key={image}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </Link>
      <h3 className="t-serif mt-6 text-2xl md:text-[1.7rem]">
        <Link href={href}>{product.name.replace("The Athar ", "The ")}</Link>
      </h3>
      <p className="mt-1 text-muted">
        {formatPrice(product.price)} <span aria-hidden>&middot;</span> {shown.name}
      </p>
      <Swatches
        colours={product.colours}
        selected={chosen.name}
        onSelect={setChosen}
        onPreview={setPreview}
        size="sm"
        className="mt-4 justify-center"
      />
    </article>
  );
}
