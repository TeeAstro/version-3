import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center gap-8 py-32 text-center md:py-48">
      <h1 className="t-display">Page not found</h1>
      <p className="text-muted">The link may be old, or the page may have moved.</p>
      <Link href="/shop" className="btn">
        Shop the collection
      </Link>
    </div>
  );
}
