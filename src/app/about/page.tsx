import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "About",
  description: "ATHAR THOBES makes thobes, shirts and hats for men. Founded in Minnesota in 2026.",
};

export default function AboutPage() {
  return (
    <>
      <section className="shell flex flex-col items-center py-20 text-center md:py-32">
        <Mark className="w-32 text-maroon md:w-44" />
        <h1 className="t-display mt-12">Athar</h1>
        <p className="t-lead mt-8 max-w-2xl">
          In Arabic, athar is what remains after someone has passed: a footprint in sand, a scent
          in a room, a good word remembered.
        </p>
      </section>

      <section className="px-3 md:px-6">
        <div className="relative h-[70svh] min-h-[24rem] overflow-hidden bg-parchment md:h-[88svh]">
          <Image
            src="/images/editorial/story-horizon.jpg"
            alt="A man in a white thobe and shemagh, seen from behind, looking out over a quiet landscape"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="shell mx-auto grid max-w-5xl gap-12 py-24 md:grid-cols-2 md:gap-20 md:py-36">
        <p className="leading-relaxed text-ink/85">
          We began in Minnesota in 2026. Finding a well-made thobe in the United States used to
          mean a suitcase favour from a relative overseas, or settling for thin cloth and a collar
          that never sat right.
        </p>
        <p className="leading-relaxed text-ink/85">
          So we make very little: one thobe, one shirt and one hat, each in a few considered
          colours. Fewer pieces, each one made properly, and shipped free across the United
          States.
        </p>
      </section>

      <section className="border-t border-line">
        <div className="shell mx-auto grid max-w-5xl gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
          <div id="fit">
            <h2 className="t-serif text-2xl">Fit</h2>
            <p className="mt-4 leading-relaxed text-muted">
              The thobe comes in three lengths, 56, 58 and 60 inches, measured from the top of the
              shoulder to the hem. The shirt comes in small, medium and large, and the hat in one
              size.
            </p>
          </div>
          <div id="shipping">
            <h2 className="t-serif text-2xl">Shipping and returns</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Shipping is free within the United States and takes 3 to 5 business days. We also
              deliver internationally. Unworn pieces can be returned within 30 days.
            </p>
          </div>
        </div>
      </section>

      <section className="shell flex justify-center pb-28 md:pb-40">
        <Link href="/shop" className="btn">
          Shop the collection
        </Link>
      </section>
    </>
  );
}
