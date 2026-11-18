"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { EXPRESS_SHIPPING, HOME_COUNTRY, INTERNATIONAL_SHIPPING, cx, formatPrice, sizeText } from "@/utils/format";
import type { CartLine } from "@/utils/types";

type Delivery = "standard" | "express";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Australia"];

interface Receipt {
  number: string;
  email: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
}

/**
 * Simulated checkout on one page. Nothing is charged, stored or sent.
 * Shopify's hosted checkout replaces this in production.
 */
export function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [country, setCountry] = useState(HOME_COUNTRY);
  const [delivery, setDelivery] = useState<Delivery>("standard");
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const domestic = country === HOME_COUNTRY;
  const standard = domestic ? 0 : INTERNATIONAL_SHIPPING;
  const shipping = delivery === "express" ? EXPRESS_SHIPPING : standard;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setReceipt({
      number: `AT-${Math.floor(10000 + Math.random() * 90000)}`,
      email: String(data.get("email") ?? ""),
      lines,
      subtotal,
      shipping,
    });
    clear();
    window.scrollTo({ top: 0 });
  }

  if (receipt) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-xl py-16 text-center md:py-28"
      >
        <p className="t-small text-muted">Order {receipt.number}</p>
        <h1 className="t-display mt-4">Thank you.</h1>
        <p className="mt-6 text-muted" role="status">
          This was a demonstration, so no payment was taken. In the live store a confirmation
          would be sent to {receipt.email}.
        </p>
        <div className="mt-12 bg-parchment p-6 text-left md:p-8">
          <Summary lines={receipt.lines} subtotal={receipt.subtotal} shipping={receipt.shipping} />
        </div>
        <Link href="/shop" className="btn mt-12">
          Continue shopping
        </Link>
      </motion.div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 py-24 text-center md:py-36">
        <h1 className="t-display">Checkout</h1>
        <p className="t-lead text-muted">Your bag is empty.</p>
        <Link href="/shop" className="btn">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-x-16 gap-y-14 py-12 md:py-20 lg:grid-cols-12">
      <form onSubmit={handleSubmit} className="lg:col-span-7">
        <h1 className="t-display">Checkout</h1>
        <p className="t-small mt-5 flex items-center gap-2 text-muted">
          <Lock size={13} strokeWidth={1.5} />
          A demonstration checkout. Nothing is charged, saved or sent.
        </p>

        <Section title="Contact">
          <Field label="Email" name="email" type="email" autoComplete="email" required className="sm:col-span-2" />
        </Section>

        <Section title="Delivery address">
          <Field label="First name" name="firstName" autoComplete="given-name" required />
          <Field label="Last name" name="lastName" autoComplete="family-name" required />
          <Field label="Address" name="address" autoComplete="address-line1" required className="sm:col-span-2" />
          <Field label="City" name="city" autoComplete="address-level2" required />
          <Field label="State or region" name="region" autoComplete="address-level1" required />
          <Field label="ZIP or postal code" name="postal" autoComplete="postal-code" required />
          <label className="block">
            <span className="t-small mb-1.5 block text-muted">Country</span>
            <select
              name="country"
              className="field"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              autoComplete="country-name"
            >
              {COUNTRIES.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
        </Section>

        <Section title="Delivery">
          <div className="grid gap-3 sm:col-span-2">
            {(
              [
                ["standard", domestic ? "Standard" : "Standard international", domestic ? "3 to 5 business days" : "7 to 12 business days", standard],
                ["express", "Express", "1 to 2 business days", EXPRESS_SHIPPING],
              ] as const
            ).map(([id, label, time, price]) => (
              <label
                key={id}
                className={cx(
                  "flex cursor-pointer items-center gap-4 px-4 py-4 transition-shadow",
                  delivery === id ? "shadow-[inset_0_0_0_1px_var(--color-ink)]" : "shadow-[inset_0_0_0_1px_var(--color-line)]",
                )}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={delivery === id}
                  onChange={() => setDelivery(id)}
                  className="size-4 accent-[#3a0f12]"
                />
                <span className="flex-1">
                  <span className="block">{label}</span>
                  <span className="t-small block text-muted">{time}</span>
                </span>
                <span className="tabular-nums">{price === 0 ? "Free" : formatPrice(price)}</span>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Payment">
          <Field label="Card number" name="card" inputMode="numeric" defaultValue="4242 4242 4242 4242" className="sm:col-span-2" />
          <Field label="Expiry" name="expiry" defaultValue="12 / 29" />
          <Field label="Security code" name="cvc" defaultValue="123" />
        </Section>

        <button type="submit" className="btn mt-12 w-full sm:w-auto">
          Place demo order, {formatPrice(subtotal + shipping)}
        </button>
      </form>

      <aside className="lg:col-span-5" aria-label="Order summary">
        <div className="bg-parchment p-6 md:p-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <h2 className="t-serif mb-2 text-2xl">Your order</h2>
          <Summary lines={lines} subtotal={subtotal} shipping={shipping} />
        </div>
      </aside>
    </div>
  );
}

function Summary({ lines, subtotal, shipping }: { lines: CartLine[]; subtotal: number; shipping: number }) {
  return (
    <>
      <ul className="divide-y divide-line">
        {lines.map((line) => (
          <li key={line.key} className="flex items-center gap-4 py-4">
            <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-line">
              <Image src={line.image} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="t-serif text-lg leading-tight">{line.name.replace("The Athar ", "The ")}</p>
              <p className="t-small text-muted">
                {[line.colour, line.size && sizeText(line.size), `Qty ${line.quantity}`].filter(Boolean).join(", ")}
              </p>
            </div>
            <p className="tabular-nums">{formatPrice(line.price * line.quantity)}</p>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-2 border-t border-line pt-5">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-3">
          <dt>Total</dt>
          <dd className="text-xl tabular-nums">{formatPrice(subtotal + shipping)}</dd>
        </div>
      </dl>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-12">
      <legend className="t-serif text-2xl">{title}</legend>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, className, ...input }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx("block", className)}>
      <span className="t-small mb-1.5 block text-muted">{label}</span>
      <input className="field" {...input} />
    </label>
  );
}
