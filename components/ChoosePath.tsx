"use client";

import {
  ArrowRight,
  Confetti,
  HeartStraight,
  Lightning,
  Sparkle,
  type Icon,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { cn } from "@/lib/utils";
import { choosePath, sectionCopy, type ChoosePathCard } from "@/lib/data";

const copy = sectionCopy.choosePath;

const iconMap: Record<string, Icon> = {
  Sparkle,
  Lightning,
  HeartStraight,
  Confetti,
};

const accentMap: Record<
  ChoosePathCard["accent"],
  { icon: string; ring: string; glow: string }
> = {
  red: {
    icon: "text-salsa-red",
    ring: "hover:ring-salsa-red/40",
    glow: "before:bg-salsa-red/15",
  },
  gold: {
    icon: "text-gold",
    ring: "hover:ring-gold/40",
    glow: "before:bg-gold/15",
  },
  green: {
    icon: "text-tropical-green",
    ring: "hover:ring-tropical-green/40",
    glow: "before:bg-tropical-green/15",
  },
  coral: {
    icon: "text-coral",
    ring: "hover:ring-coral/40",
    glow: "before:bg-coral/15",
  },
};

export function ChoosePath() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="choose-path" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Choose your path
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
            {copy.subheading && (
              <p className="mt-4 text-base leading-relaxed text-espresso-soft">
                {copy.subheading}
              </p>
            )}
          </div>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {choosePath.map((card, i) => {
            const IconComponent = iconMap[card.icon] ?? Sparkle;
            const accent = accentMap[card.accent];

            return (
              <BlurFade key={card.id} delay={i * 0.06} inViewMargin="-40px">
                <motion.a
                  href={card.href}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "glass-card group relative flex h-full flex-col justify-between overflow-hidden p-6 ring-1 ring-transparent transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(27,18,13,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    accent.ring
                  )}
                >
                  <div>
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 items-center justify-center rounded-md bg-cream-soft/80",
                        accent.icon
                      )}
                    >
                      <IconComponent size={24} weight="duotone" />
                    </span>

                    <p className="mt-5 text-sm font-medium text-muted">
                      {card.prompt}
                    </p>
                    <p className="mt-1 font-display text-2xl font-light text-espresso">
                      {card.target}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-espresso-soft">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-espresso transition-colors duration-300 group-hover:text-salsa-red">
                    Find my class
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </motion.a>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
