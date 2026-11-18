import type { Metadata } from "next";
import { Checkout } from "@/components/cart/Checkout";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="shell pb-24 md:pb-36">
      <Checkout />
    </div>
  );
}
