"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { galleryItems, sectionCopy, type GalleryItem } from "@/lib/data";

const copy = sectionCopy.gallery;

// Warm, low-saturation diagonal gradient per accent — used as the base layer
// so tiles look intentional even before real photography lands.
const placeholderGradients: Record<GalleryItem["accent"], string> = {
  red: "linear-gradient(135deg, rgba(127, 21, 21, 0.55), rgba(212, 160, 23, 0.35))",
  gold: "linear-gradient(135deg, rgba(212, 160, 23, 0.5), rgba(185, 28, 28, 0.28))",
  green: "linear-gradient(135deg, rgba(31, 138, 91, 0.42), rgba(212, 160, 23, 0.3))",
  coral: "linear-gradient(135deg, rgba(249, 115, 91, 0.48), rgba(127, 21, 21, 0.3))",
};

// Editorial mixed grid: landscape tiles span two columns, portrait tiles
// span two rows for a masonry-like rhythm on desktop.
const spanClasses: Record<GalleryItem["aspect"], string> = {
  landscape: "sm:col-span-2 aspect-[4/3] sm:aspect-[16/10]",
  portrait: "row-span-2 aspect-[3/4] sm:aspect-[3/4]",
};

export function CommunityGallery() {
  const reduce = useReducedMotion();

  return (
    <section id="gallery" className="page-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Community
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
            {copy.subheading && (
              <p className="mt-6 text-base leading-relaxed text-muted">
                {copy.subheading}
              </p>
            )}
          </div>
        </BlurFade>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-16 md:gap-5">
          {galleryItems.map((item, i) => (
            <BlurFade
              key={item.label}
              delay={i * 0.06}
              inViewMargin="-40px"
              className={spanClasses[item.aspect]}
            >
              <motion.figure
                whileHover={reduce ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative h-full w-full overflow-hidden rounded-lg"
              >
                <GalleryTile item={item} />
              </motion.figure>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ item }: { item: GalleryItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative h-full w-full">
      {/* Base placeholder layer — always rendered so the tile reads as
          intentional design even while item.src does not exist yet. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-end justify-start p-4"
        style={{ background: placeholderGradients[item.accent] }}
      >
        <span className="font-display text-lg italic leading-tight text-cream-soft/80 sm:text-xl">
          {item.label}
        </span>
      </div>

      {/* Real photo, layered on top once available. Hides itself on error
          so the placeholder above remains visible. */}
      {!imgFailed && (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 640px) 25vw, 50vw"
          className="object-cover"
          onError={() => setImgFailed(true)}
        />
      )}

      {/* Hover overlay label (always visible on touch via group-focus fallback) */}
      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-espresso/80 via-espresso/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream-soft">
          {item.label}
        </span>
      </div>
    </div>
  );
}
