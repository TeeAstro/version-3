"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_LABELS, getColourways } from "@/utils/catalog";
import { cx, formatPrice } from "@/utils/format";
import type { Category, Product } from "@/utils/types";
import { PieceTile } from "./PieceTile";

type Filter = Category | "all";
type View = "pieces" | "colours";
type Sort = "featured" | "price-asc" | "price-desc";

const SORTS: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
};

/** Browse by piece (three products) or by colour (every colourway as its own tile). */
export function ShopView({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("pieces");
  const [sort, setSort] = useState<Sort>("featured");

  const pieces = useMemo(() => {
    const list = products.filter((p) => filter === "all" || p.category === filter);
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, filter, sort]);
  const colourways = useMemo(() => getColourways(pieces), [pieces]);
  const count = view === "pieces" ? pieces.length : colourways.length;

  return (
    <div>
      <div className="flex flex-col items-center gap-6 border-y border-line py-5 md:flex-row md:justify-between">
        <div className="flex gap-6" role="group" aria-label="Filter">
          {(["all", "thobes", "shirts", "hats"] as Filter[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={cx("u-link", filter !== key && "text-muted hover:text-ink")}
            >
              {key === "all" ? "All" : CATEGORY_LABELS[key]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4" role="group" aria-label="View">
            {(["pieces", "colours"] as View[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={cx("u-link", view !== key && "text-muted hover:text-ink")}
              >
                {key === "pieces" ? "By piece" : "By colour"}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="cursor-pointer bg-transparent py-1"
            >
              {(Object.keys(SORTS) as Sort[]).map((key) => (
                <option key={key} value={key}>
                  {SORTS[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="t-small py-6 text-center text-muted" aria-live="polite">
        {count} {view === "pieces" ? (count === 1 ? "piece" : "pieces") : count === 1 ? "colour" : "colours"}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${view}-${filter}-${sort}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === "pieces" ? (
            <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-20 md:grid-cols-3">
              {pieces.map((product, index) => (
                <PieceTile key={product.id} product={product} priority={index < 3} />
              ))}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
              {colourways.map(({ product, colour, image, href }, index) => (
                <li key={`${product.id}-${colour.name}`}>
                  <Link href={href} className="group block text-center">
                    <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
                      <Image
                        src={image}
                        alt={`${product.name} in ${colour.name}`}
                        fill
                        priority={index < 4}
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="t-serif mt-4 text-xl">{product.name.replace("The Athar ", "The ")}</p>
                    <p className="t-small mt-1 flex items-center justify-center gap-2 text-muted">
                      <span className="size-2.5 rounded-full border border-ink/15" style={{ backgroundColor: colour.hex }} />
                      {colour.name}, {formatPrice(product.price)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
