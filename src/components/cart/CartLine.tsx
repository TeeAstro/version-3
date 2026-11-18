"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/context/CartContext";
import { colourSlug } from "@/utils/catalog";
import { cx, formatPrice, sizeText } from "@/utils/format";
import type { CartLine as Line } from "@/utils/types";

/** One line in the bag, shared by the drawer and the bag page. */
export function CartLine({ line, onNavigate, large }: { line: Line; onNavigate?: () => void; large?: boolean }) {
  const { setQuantity, remove } = useCart();
  const href = `/products/${line.slug}${line.colour ? `?colour=${colourSlug(line.colour)}` : ""}`;

  return (
    <li className="flex gap-5 py-6">
      <Link
        href={href}
        onClick={onNavigate}
        className={cx("relative aspect-[4/5] shrink-0 overflow-hidden bg-parchment", large ? "w-28 md:w-36" : "w-24")}
      >
        <Image src={line.image} alt={line.name} fill sizes="144px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={href} onClick={onNavigate} className={cx("t-serif leading-tight", large ? "text-2xl" : "text-xl")}>
              {line.name.replace("The Athar ", "The ")}
            </Link>
            <p className="t-small mt-1 text-muted">
              {[line.colour, line.size && sizeText(line.size)].filter(Boolean).join(", ")}
            </p>
          </div>
          <p className="tabular-nums">{formatPrice(line.price * line.quantity)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <QuantityStepper
            value={line.quantity}
            onChange={(quantity) => setQuantity(line.key, quantity)}
            label={`Quantity of ${line.name}`}
          />
          <button
            type="button"
            onClick={() => remove(line.key)}
            aria-label={`Remove ${line.name} from bag`}
            className="u-link t-small text-muted"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
