"use client";

import { motion, useReducedMotion } from "motion/react";
import { Clock, MapPin } from "@phosphor-icons/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { weeklySchedule, sectionCopy } from "@/lib/data";

const copy = sectionCopy.schedule;

export function WeeklySchedule() {
  const reduce = useReducedMotion();

  return (
    <section id="schedule" className="page-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-salsa-red">
              Schedule
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

        {/* Mobile: horizontal snap scroll. Desktop: responsive grid. */}
        <div
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:-mx-1 sm:px-1 md:mt-16 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3"
          style={{ scrollbarWidth: "none" }}
        >
          {weeklySchedule.map((item, i) => (
            <BlurFade
              key={`${item.day}-${item.className}`}
              delay={i * 0.08}
              inViewMargin="-40px"
              className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass-card flex h-full flex-col p-7 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-espresso">
                    {item.day}
                  </span>
                  <span className="rounded-pill border border-salsa-red/30 bg-salsa-red/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-salsa-red">
                    {item.level}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-medium leading-snug text-espresso md:text-[1.75rem]">
                  {item.className}
                </h3>

                {(item.time || item.location) && (
                  <div className="mt-4 flex flex-col gap-2 text-sm text-espresso-soft">
                    {item.time && (
                      <span className="flex items-center gap-2">
                        <Clock size={16} weight="light" className="text-gold" />
                        {item.time}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-2">
                        <MapPin size={16} weight="light" className="text-gold" />
                        {item.location}
                      </span>
                    )}
                  </div>
                )}

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.bestFor}
                </p>

                <a
                  href={item.href}
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-pill border border-gold/50 px-6 py-2.5 text-sm font-medium text-espresso transition-colors duration-200 hover:border-gold hover:bg-gold/10"
                >
                  Book this class
                </a>
              </motion.article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
