"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartLine, Product } from "@/utils/types";

/**
 * Cart state lives in a small store backed by localStorage so the bag
 * survives a refresh. With Shopify this becomes the Storefront cart API.
 */

const STORAGE_KEY = "athar-cart-v2";
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) lines = JSON.parse(raw) as CartLine[];
  } catch {
    lines = EMPTY;
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private windows; the bag still works in memory.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => {
  load();
  return lines;
};
const getServerSnapshot = () => EMPTY;

interface AddOptions {
  colour?: string;
  size?: string;
  image?: string;
  quantity?: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, options?: AddOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((product: Product, options: AddOptions = {}) => {
    const { colour, size, image, quantity = 1 } = options;
    const key = [product.id, colour, size].filter(Boolean).join("|");
    const existing = lines.find((line) => line.key === key);
    if (existing) {
      commit(
        lines.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        ),
      );
    } else {
      commit([
        ...lines,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: image ?? product.images[0],
          price: product.price,
          colour,
          size,
          quantity,
        },
      ]);
    }
    setOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) {
      commit(lines.filter((line) => line.key !== key));
      return;
    }
    commit(lines.map((line) => (line.key === key ? { ...line, quantity } : line)));
  }, []);

  const remove = useCallback((key: string) => {
    commit(lines.filter((line) => line.key !== key));
  }, []);

  const clear = useCallback(() => commit([]), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: current,
      count: current.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: current.reduce((sum, line) => sum + line.price * line.quantity, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [current, isOpen, open, close, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
