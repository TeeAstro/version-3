"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/format";
import { CartLine } from "./CartLine";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-50 bg-oxblood/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[30rem] flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5 md:px-8">
              <h2 className="t-serif text-2xl">
                Your bag <span className="text-lg tabular-nums text-muted">({count})</span>
              </h2>
              <button ref={closeRef} type="button" onClick={close} aria-label="Close bag" className="-mr-2 grid size-10 place-items-center">
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                <p className="t-title">Your bag is empty.</p>
                <Link href="/shop" onClick={close} className="btn">
                  Shop the collection
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6 md:px-8">
                  {lines.map((line) => (
                    <CartLine key={line.key} line={line} onNavigate={close} />
                  ))}
                </ul>
                <div className="border-t border-line px-6 pb-7 pt-5 md:px-8">
                  <div className="flex items-baseline justify-between">
                    <span>Subtotal</span>
                    <span className="text-xl tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="t-small mt-1 text-muted">Free shipping in the United States. Taxes calculated at checkout.</p>
                  <div className="mt-6 grid gap-3">
                    <Link href="/checkout" onClick={close} className="btn">
                      Checkout
                    </Link>
                    <Link href="/bag" onClick={close} className="btn btn-ghost">
                      View bag
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
