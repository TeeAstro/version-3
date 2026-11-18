import Link from "next/link";
import { Lockup } from "@/components/ui/Logo";
import { Newsletter } from "@/components/ui/Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="shell py-20 text-center md:py-28">
        <h2 className="t-title">Letters from Athar</h2>
        <p className="mx-auto mb-10 mt-4 max-w-sm text-muted">New colours and limited runs, before anyone else.</p>
        <Newsletter />
      </div>

      <div className="shell flex flex-col items-center gap-10 border-t border-line py-16">
        <span className="text-maroon">
          <Lockup showYear markClassName="w-16 md:w-20" className="text-ink" />
        </span>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          <Link href="/shop" className="u-link">Shop</Link>
          <Link href="/about" className="u-link">About</Link>
          <Link href="/bag" className="u-link">Bag</Link>
          <a href="mailto:hello@atharthobes.com" className="u-link">Contact</a>
        </nav>
        <p className="t-small max-w-md text-center text-muted">
          Minneapolis, Minnesota. Free shipping in the United States. This is a prototype; no
          orders are taken.
        </p>
      </div>
    </footer>
  );
}
