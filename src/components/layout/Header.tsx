"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lockup } from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/products/thobe", label: "Thobe" },
  { href: "/products/shirt", label: "Shirt" },
  { href: "/products/hat", label: "Hat" },
  { href: "/about", label: "About" },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Centred logo, as on the brand artwork, with navigation to the left and the bag to the right. */
export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/95 backdrop-blur-sm">
      <div className="shell grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          <button
            type="button"
            className="-ml-2 grid size-10 place-items-center md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={20} strokeWidth={1.25} />
          </button>
          <nav aria-label="Main" className="hidden gap-7 md:flex lg:gap-9">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="u-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link href="/" aria-label="ATHAR THOBES home" className="text-maroon">
          <Lockup markClassName="w-10 md:w-12" />
        </Link>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={open}
            className="-mr-2 flex h-10 items-center gap-2 px-2"
            aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <span className="hidden md:inline">Bag</span>
            <span className="relative">
              <ShoppingBag size={19} strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-oxblood text-[0.6rem] tabular-nums text-ivory">
                  {count}
                </span>
              )}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex h-dvh flex-col bg-ivory md:hidden"
          >
            <div className="flex h-[var(--header-h)] items-center justify-between px-5">
              <span className="text-maroon">
                <Lockup markClassName="w-10" />
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="-mr-2 grid size-10 place-items-center"
              >
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-3">
              {[{ href: "/", label: "Home" }, ...NAV, { href: "/bag", label: "Bag" }].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.5, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="t-title block py-1 text-center"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="t-small pb-10 text-center text-muted">Minneapolis, Minnesota</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
