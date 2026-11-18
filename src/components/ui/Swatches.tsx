"use client";

import { cx } from "@/utils/format";
import type { ProductColour } from "@/utils/types";

interface Props {
  colours: ProductColour[];
  selected: string;
  onSelect: (colour: ProductColour) => void;
  /** Called on hover, for previews that change without committing. */
  onPreview?: (colour: ProductColour | null) => void;
  size?: "sm" | "md";
  className?: string;
}

/** Round colour swatches. The selected one gets a thin ring. */
export function Swatches({ colours, selected, onSelect, onPreview, size = "md", className }: Props) {
  return (
    <div
      className={cx("flex flex-wrap", size === "sm" ? "gap-2" : "gap-3", className)}
      onMouseLeave={() => onPreview?.(null)}
    >
      {colours.map((colour) => {
        const active = colour.name === selected;
        return (
          <button
            key={colour.name}
            type="button"
            onClick={() => onSelect(colour)}
            onMouseEnter={() => onPreview?.(colour)}
            onFocus={() => onPreview?.(colour)}
            aria-label={colour.name}
            aria-pressed={active}
            title={colour.name}
            className={cx(
              "rounded-full p-[3px] transition-shadow duration-300",
              active ? "shadow-[0_0_0_1px_var(--color-ink)]" : "hover:shadow-[0_0_0_1px_var(--color-line)]",
            )}
          >
            <span
              className={cx("block rounded-full border border-ink/15", size === "sm" ? "size-3.5" : "size-6")}
              style={{ backgroundColor: colour.hex }}
            />
          </button>
        );
      })}
    </div>
  );
}
