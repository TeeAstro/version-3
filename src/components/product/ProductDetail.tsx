"use client";

import { useState } from "react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Swatches } from "@/components/ui/Swatches";
import { useCart } from "@/context/CartContext";
import { CATEGORY_LABELS, colourSlug } from "@/utils/catalog";
import { cx, formatPrice } from "@/utils/format";
import type { Product } from "@/utils/types";
import { Gallery } from "./Gallery";

/**
 * Three columns on desktop: the story of the piece on the left, the
 * photographs in the middle, and the choices on the right.
 */
export function ProductDetail({ product, initialColour }: { product: Product; initialColour?: string }) {
  const { add } = useCart();
  const [colour, setColour] = useState(
    product.colours.find((c) => colourSlug(c.name) === initialColour) ?? product.colours[0],
  );
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const images = colour.images ?? product.images;
  const guide = product.sizeGuide ?? {};
  const noun = product.category === "thobes" ? "length" : "size";

  function chooseColour(next: typeof colour) {
    setColour(next);
    // Keep the address in step, so the link can be shared in that colour.
    const url = new URL(window.location.href);
    url.searchParams.set("colour", colourSlug(next.name));
    window.history.replaceState(null, "", url);
  }

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      return;
    }
    add(product, { colour: colour.name, size, image: images[0], quantity });
  }

  const title = product.name.replace("The Athar ", "The ");

  return (
    <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
      {/* Photographs */}
      <div className="lg:order-2 lg:col-span-6">
        <Gallery key={colour.name} images={images} name={`${product.name} in ${colour.name}`} />
      </div>

      {/* Name, price and story */}
      <div className="lg:order-1 lg:col-span-3">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
          <p className="t-small text-muted">{CATEGORY_LABELS[product.category]}</p>
          <h1 className="t-title mt-3">{title}</h1>
          <p className="mt-3 text-lg tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-8 leading-relaxed text-ink/85">{product.description}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {product.details.map((detail) => (
              <li key={detail} className="t-small py-3 text-muted">
                {detail}
              </li>
            ))}
          </ul>
          <p className="t-small mt-6 text-muted">
            Free shipping in the United States. Returns within 30 days, unworn.
          </p>
        </div>
      </div>

      {/* Choices */}
      <div className="lg:order-3 lg:col-span-3">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
          <fieldset>
            <legend className="mb-3">
              Colour <span className="text-muted">{colour.name}</span>
            </legend>
            <Swatches colours={product.colours} selected={colour.name} onSelect={chooseColour} />
          </fieldset>

          <fieldset className="mt-9">
            <legend className="mb-3">
              {product.sizeLabel}
              {size && guide[size] && <span className="text-muted"> {guide[size]}</span>}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSize(option);
                    setSizeError(false);
                  }}
                  aria-pressed={option === size}
                  className={cx(
                    "h-11 min-w-14 px-4 tabular-nums transition-colors",
                    option === size ? "bg-ink text-ivory" : "shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1px_var(--color-ink)]",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="t-small mt-3 text-maroon" role="alert">
                Choose a {noun} to add this to your bag.
              </p>
            )}
            {product.category === "thobes" && (
              <p className="t-small mt-3 text-muted">
                Lengths are measured from the top of the shoulder to the hem.
              </p>
            )}
          </fieldset>

          <div className="mt-9 flex gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} label="Quantity" />
            <button type="button" onClick={handleAdd} className="btn flex-1" data-testid="add-to-bag">
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
