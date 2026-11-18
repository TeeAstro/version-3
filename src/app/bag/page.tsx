"use client";

import Link from "next/link";
import { CartLine } from "@/components/cart/CartLine";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/format";

export default function BagPage() {
  const { lines, subtotal } = useCart();

  return (
    <div className="shell pb-28 md:pb-40">
      <h1 className="t-display py-14 text-center md:py-20">Your bag</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-8 border-t border-line py-20 text-center">
          <p className="t-lead text-muted">There is nothing in your bag yet.</p>
          <Link href="/shop" className="btn">
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <ul className="divide-y divide-line border-y border-line lg:col-span-7">
            {lines.map((line) => (
              <CartLine key={line.key} line={line} large />
            ))}
          </ul>
          <aside className="lg:col-span-5" aria-label="Order summary">
            <div className="bg-parchment p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <h2 className="t-serif text-2xl">Summary</h2>
              <dl className="mt-6 space-y-3">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping in the US</dt>
                  <dd>Free</dd>
                </div>
              </dl>
              <p className="t-small mt-4 text-muted">International shipping and taxes are calculated at checkout.</p>
              <div className="mt-8 grid gap-3">
                <Link href="/checkout" className="btn">
                  Checkout
                </Link>
                <Link href="/shop" className="btn btn-ghost">
                  Continue shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
