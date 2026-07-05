"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Play } from "@phosphor-icons/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { reels, sectionCopy, type Reel } from "@/lib/data";

const copy = sectionCopy.reels;

// Warm diagonal placeholder washes, cycled per card since Reel has no accent field.
const placeholderGradients = [
  "linear-gradient(160deg, rgba(127, 21, 21, 0.55), rgba(212, 160, 23, 0.32))",
  "linear-gradient(160deg, rgba(212, 160, 23, 0.5), rgba(249, 115, 91, 0.32))",
  "linear-gradient(160deg, rgba(31, 138, 91, 0.4), rgba(127, 21, 21, 0.3))",
];

export function VideoReels() {
  const reduce = useReducedMotion();

  return (
    <section id="reels" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Reels
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

        <div
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:-mx-1 sm:px-1 md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {reels.map((reel, i) => (
            <BlurFade
              key={reel.title}
              delay={i * 0.08}
              inViewMargin="-40px"
              className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-auto"
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.2 }}
                className="premium-card flex h-full flex-col p-3"
              >
                <ReelThumbnail reel={reel} gradient={placeholderGradients[i % placeholderGradients.length]} />
                <div className="px-3 pb-3 pt-4">
                  <h3 className="font-display text-xl font-medium leading-snug text-espresso">
                    {reel.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {reel.caption}
                  </p>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.2} inViewMargin="-20px">
          <p className="mt-10 text-center text-xs text-muted">
            More moments coming soon — follow the Salsita Family on Instagram for the full reel.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

function ReelThumbnail({ reel, gradient }: { reel: Reel; gradient: string }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md">
      {/* Base placeholder layer — thumbnails do not exist yet. */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-end justify-start p-5"
        style={{ background: gradient }}
      >
        <span className="font-display text-2xl italic leading-tight text-cream-soft/80">
          {reel.title}
        </span>
      </div>

      {!imgFailed && (
        <Image
          src={reel.thumbnail}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 72vw"
          className="object-cover"
          onError={() => setImgFailed(true)}
        />
      )}

      {/* Decorative, non-interactive play affordance. This card does not
          play video yet, so the glyph is aria-hidden and the card carries
          no button/link semantics — nothing false is announced to AT. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full border border-cream-soft/40 bg-espresso/30 backdrop-blur-md"
        >
          <Play size={26} weight="fill" className="ml-1 text-cream-soft" />
        </span>
      </div>
    </div>
  );
}
