/**
 * Storefront types. These mirror the shape of Shopify's Storefront API
 * (product, options) closely enough that swapping the demo catalogue for
 * live data only touches `utils/catalog.ts`.
 */

export type Category = "thobes" | "shirts" | "hats";

export interface ProductColour {
  name: string;
  /** Swatch colour shown in the selector. */
  hex: string;
  /** Photographs of this colour. Falls back to the product images. */
  images?: string[];
  /** Optional full-length photograph, used by the homepage colour strip. */
  fullLength?: string;
}

export interface Product {
  id: string;
  /** URL handle, same role as a Shopify product handle. */
  slug: string;
  name: string;
  category: Category;
  /** Price in US dollars. */
  price: number;
  summary: string;
  description: string;
  details: string[];
  images: string[];
  colours: ProductColour[];
  /** What the size option is called, e.g. "Length in inches". */
  sizeLabel: string;
  sizes: string[];
  /** Optional note shown beside each size. */
  sizeGuide?: Record<string, string>;
}

export interface CartLine {
  /** Unique per product + colour + size. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  colour?: string;
  size?: string;
  quantity: number;
}
