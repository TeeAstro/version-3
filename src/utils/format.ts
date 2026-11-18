const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return usd.format(amount);
}

/** Standard shipping is free within the United States. */
export const HOME_COUNTRY = "United States";
export const INTERNATIONAL_SHIPPING = 25;
export const EXPRESS_SHIPPING = 28;

/** "Length 56" for thobes, "Size M" for everything else. */
export function sizeText(size: string): string {
  if (/^\d+$/.test(size)) return `Length ${size}`;
  return /size/i.test(size) ? size : `Size ${size}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
