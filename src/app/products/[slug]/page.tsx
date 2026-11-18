import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PieceTile } from "@/components/product/PieceTile";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getOtherProducts, getProductBySlug, getProducts } from "@/utils/catalog";
import type { Product } from "@/utils/types";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ colour?: string }>;
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.summary } : {};
}

/** Reads ?colour= from the address, which is only known at request time. */
async function WithColour({ product, searchParams }: { product: Product; searchParams: Props["searchParams"] }) {
  const { colour } = await searchParams;
  return <ProductDetail key={`${product.id}-${colour ?? ""}`} product={product} initialColour={colour} />;
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <div className="shell pt-8 md:pt-14">
        <Suspense fallback={<ProductDetail product={product} />}>
          <WithColour product={product} searchParams={searchParams} />
        </Suspense>
      </div>

      <section className="shell pb-28 pt-32 md:pb-40 md:pt-48" aria-labelledby="pair-heading">
        <h2 id="pair-heading" className="t-title text-center">
          Wear it <span className="italic">with</span>
        </h2>
        <div className="mx-auto mt-14 grid max-w-4xl gap-x-6 gap-y-20 md:mt-20 md:grid-cols-2">
          {getOtherProducts(product).map((other) => (
            <PieceTile key={other.id} product={other} sizes="(min-width: 768px) 40vw, 100vw" />
          ))}
        </div>
      </section>
    </>
  );
}
