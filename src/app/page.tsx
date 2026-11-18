import Link from "next/link";
import { ColourStrip } from "@/components/home/ColourStrip";
import { Hero } from "@/components/home/Hero";
import { Opening } from "@/components/home/Opening";
import { PieceTile } from "@/components/product/PieceTile";
import { Mark } from "@/components/ui/Logo";
import { getProductByCategory, getProducts } from "@/utils/catalog";

export default function HomePage() {
  const products = getProducts();
  const thobe = getProductByCategory("thobes");

  return (
    <>
      <Opening />
      <Hero />

      {/* The three pieces */}
      <section className="shell pt-28 md:pt-44" aria-labelledby="pieces-heading">
        <h2 id="pieces-heading" className="t-title text-center">
          The collection
        </h2>
        <div className="mt-14 grid gap-x-6 gap-y-20 md:mt-20 md:grid-cols-3">
          {products.map((product, index) => (
            <PieceTile key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      </section>

      {/* The thobe in five colours */}
      <section className="shell pt-32 md:pt-52" aria-labelledby="colours-heading">
        <div className="mb-12 text-center md:mb-16">
          <h2 id="colours-heading" className="t-title">
            One thobe, <span className="italic">five colours</span>
          </h2>
        </div>
        <ColourStrip product={thobe} />
      </section>

      {/* The name */}
      <section className="on-dark mt-32 bg-oxblood text-ivory md:mt-52" aria-labelledby="story-heading">
        <div className="shell flex flex-col items-center py-28 text-center md:py-40">
          <Mark className="w-32 text-blush md:w-40" />
          <h2 id="story-heading" className="sr-only">
            Our story
          </h2>
          <p className="t-lead mt-12 max-w-2xl">
            In Arabic, athar is what remains after someone has passed: a footprint in sand, a
            good word remembered.
          </p>
          <Link href="/about" className="u-link u-link-on mt-10 text-blush">
            About Athar
          </Link>
        </div>
      </section>
    </>
  );
}
