import type { Metadata } from "next";
import { ShopView } from "@/components/product/ShopView";
import { getProducts } from "@/utils/catalog";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="shell pb-28 md:pb-40">
      <h1 className="t-display py-14 text-center md:py-20">Shop</h1>
      <ShopView products={getProducts()} />
    </div>
  );
}
