"use client";

import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function QuantityStepper({ value, onChange, label }: Props) {
  return (
    <div className="inline-flex h-11 items-center border border-line" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className="grid h-full w-10 place-items-center transition-colors hover:bg-parchment disabled:opacity-30"
      >
        <Minus size={13} strokeWidth={1.5} />
      </button>
      <span className="w-7 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className="grid h-full w-10 place-items-center transition-colors hover:bg-parchment"
      >
        <Plus size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}
