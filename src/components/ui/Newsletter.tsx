"use client";

import { useState } from "react";

/** Prototype only: nothing is sent anywhere. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p className="t-lead italic" role="status">
        Thank you. We will write to {email}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-md">
      <label htmlFor="newsletter" className="sr-only">
        Email address
      </label>
      <div className="flex items-center border-b border-ink/40 focus-within:border-ink">
        <input
          id="newsletter"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent py-3 placeholder:text-muted focus:outline-none"
        />
        <button type="submit" className="u-link shrink-0 py-3 pl-4 font-medium">
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p id="newsletter-error" role="alert" className="t-small mt-3 text-maroon">
          Enter a full email address, such as name@example.com.
        </p>
      )}
    </form>
  );
}
