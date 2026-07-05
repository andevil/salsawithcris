"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { NumberTicker } from "@/components/magicui/NumberTicker";
import { philosophyCards, sectionCopy, stats } from "@/lib/data";

const copy = sectionCopy.about;

export function About() {
  // The portrait lives at /public/images/cristhian-portrait.jpg.
  // If it is missing, we fall back to a warm editorial placeholder block.
  // Drop the real photo at that path to replace the placeholder.
  const [imgFailed, setImgFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* Image column */}
          <BlurFade direction="left" inViewMargin="-80px">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl ring-1 ring-gold/30 shadow-[0_24px_70px_rgba(27,18,13,0.16)]">
                {!imgFailed ? (
                  <Image
                    src="/images/cristhian-portrait.jpg"
                    alt="Cristhian Garzón, Colombian salsa instructor in Budapest"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-soft to-gold-soft/30 text-center">
                    <span className="font-display text-7xl font-light text-salsa-red">
                      CG
                    </span>
                    <span className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">
                      Portrait placeholder
                    </span>
                    <span className="mt-2 max-w-[16rem] px-6 text-xs text-muted">
                      Add /public/images/cristhian-portrait.jpg
                    </span>
                  </div>
                )}
              </div>

              {/* Floating badge */}
              <motion.div
                className="glass-card animate-float-drift absolute -bottom-6 -right-4 hidden -rotate-3 px-5 py-3 sm:block"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <span className="text-sm font-medium text-espresso">
                  From Colombia to Budapest
                </span>
              </motion.div>
            </div>
          </BlurFade>

          {/* Story column */}
          <BlurFade direction="right" inViewMargin="-80px" className="flex flex-col justify-center">
            <p className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              About Cristhian
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              Dance first.
              <br />
              <span className="italic text-salsa-red">Technique with feeling.</span>
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-espresso-soft">
              {copy.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Philosophy cards */}
            <div className="mt-10 flex flex-wrap gap-3">
              {philosophyCards.map((card) => (
                <div
                  key={card.title}
                  className="glass-card group max-w-[15rem] rounded-md px-4 py-3 transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="text-sm font-semibold text-espresso">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {card.line}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Stats row */}
        <BlurFade delay={0.1} inViewMargin="-40px">
          <div className="mt-20 grid grid-cols-2 gap-4 md:mt-28 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card flex flex-col items-center px-4 py-10 text-center"
              >
                <span className="font-display text-5xl font-light text-gold md:text-6xl">
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </span>
                <span className="mt-3 text-xs uppercase tracking-[0.2em] text-espresso-soft">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
