import { products } from "@/data/products";
import type { Category, Product } from "./types";

/**
 * The only place pages read catalogue data from.
 * When Shopify is connected, reimplement these functions with
 * Storefront API queries and keep the signatures the same.
 */

export const CATEGORY_LABELS: Record<Category, string> = {
  thobes: "Thobes",
  shirts: "Shirts",
  hats: "Hats",
};

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductByCategory(category: Category): Product {
  return products.find((product) => product.category === category)!;
}

/** The other pieces in the range. */
export function getOtherProducts(product: Product): Product[] {
  return products.filter((other) => other.id !== product.id);
}

/** URL-safe name for a colour, e.g. "Rose maroon" -> "rose-maroon". */
export function colourSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export interface Colourway {
  product: Product;
  colour: Product["colours"][number];
  image: string;
  href: string;
}

/** Every product in every colour, for the shop's colour view. */
export function getColourways(list: Product[] = products): Colourway[] {
  return list.flatMap((product) =>
    product.colours.map((colour) => ({
      product,
      colour,
      image: (colour.images ?? product.images)[0],
      href: `/products/${product.slug}?colour=${colourSlug(colour.name)}`,
    })),
  );
}
