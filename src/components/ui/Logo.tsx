import { cx } from "@/utils/format";

const mask = {
  maskImage: "url(/brand/athar-mark.png)",
  WebkitMaskImage: "url(/brand/athar-mark.png)",
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
} as const;

/** The calligraphic mark from the official logo, tinted with the current colour. */
export function Mark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Athar, written in Arabic calligraphy"
      className={cx("block aspect-[767/560] bg-current", className)}
      style={mask}
    />
  );
}

/** Stacked lockup, as on the logo artwork: mark, wordmark, and optionally the year. */
export function Lockup({
  className,
  markClassName,
  showYear = false,
}: {
  className?: string;
  markClassName?: string;
  showYear?: boolean;
}) {
  return (
    <span className={cx("flex flex-col items-center", className)}>
      <Mark className={cx("text-maroon", markClassName ?? "w-11 md:w-14")} />
      <span className="mt-1 whitespace-nowrap pl-[0.3em] font-serif text-[0.62rem] uppercase tracking-[0.3em] md:text-[0.7rem]">
        Athar Thobes
      </span>
      {showYear && <span className="mt-6 pl-[0.2em] font-serif text-xs tracking-[0.2em]">Est. 2026</span>}
    </span>
  );
}
