"use client";

import {
  Confetti,
  HeartStraight,
  Lightning,
  MusicNotes,
  UserFocus,
  type Icon,
} from "@phosphor-icons/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { cn } from "@/lib/utils";
import { sectionCopy, services } from "@/lib/data";

const copy = sectionCopy.services;

const iconMap: Record<string, Icon> = {
  MusicNotes,
  Lightning,
  UserFocus,
  Confetti,
  HeartStraight,
};

export function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Services
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
          </div>
        </BlurFade>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const IconComponent = iconMap[service.icon] ?? MusicNotes;
            const isLast = i === services.length - 1;

            return (
              <BlurFade
                key={service.index}
                delay={i * 0.06}
                inViewMargin="-40px"
                className={cn(isLast && "md:col-span-2")}
              >
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "premium-card group relative flex h-full flex-col overflow-hidden p-8 transition-shadow duration-300 hover:shadow-[0_28px_90px_rgba(27,18,13,0.18)]",
                    isLast && "md:mx-auto md:max-w-2xl md:flex-row md:items-center md:gap-8 md:p-10"
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-light leading-none text-gold/15 md:text-[8rem]"
                  >
                    {service.index}
                  </span>

                  <div className={cn("relative", isLast && "md:flex-shrink-0")}>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-cream-soft/80 text-salsa-red">
                      <IconComponent size={24} weight="duotone" />
                    </span>
                  </div>

                  <div className="relative mt-5 flex flex-1 flex-col md:mt-5">
                    <h3 className="font-display text-2xl font-light text-espresso sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-espresso-soft">
                      {service.benefit}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.1em] text-muted">
                      {service.details}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-gold">
                        {service.price}
                      </span>
                      <a
                        href={service.cta.href}
                        className="inline-flex items-center gap-1.5 rounded-pill border border-salsa-red/30 px-4 py-2 text-sm font-semibold text-salsa-red transition-colors duration-300 hover:bg-salsa-red hover:text-cream-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        {service.cta.label}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </motion.article>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
