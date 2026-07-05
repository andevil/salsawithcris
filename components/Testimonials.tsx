"use client";

import { motion, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import {
  featuredTestimonial,
  sectionCopy,
  supportingTestimonials,
  type Testimonial,
} from "@/lib/data";

const copy = sectionCopy.testimonials;

const accentClasses: Record<Testimonial["accent"], string> = {
  red: "bg-salsa-red text-cream-soft",
  gold: "bg-gold text-espresso",
  green: "bg-tropical-green text-cream-soft",
  coral: "bg-coral text-cream-soft",
};

export function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Warm gradient wash behind the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(185, 28, 28, 0.10), transparent 32%), radial-gradient(circle at 85% 15%, rgba(212, 160, 23, 0.14), transparent 30%), radial-gradient(circle at 50% 95%, rgba(31, 138, 91, 0.08), transparent 36%), #FFF6E8",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              From the Salsita Family
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
          </div>
        </BlurFade>

        {/* Featured testimonial */}
        <BlurFade delay={0.08} inViewMargin="-40px">
          <div className="glass-card relative mx-auto mt-16 max-w-3xl px-8 py-12 text-center md:px-16 md:py-16">
            <span
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-display text-[8rem] leading-none text-gold/25 md:text-[10rem]"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="relative font-display text-2xl font-light italic leading-snug text-espresso sm:text-3xl md:text-4xl">
              {featuredTestimonial.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${accentClasses[featuredTestimonial.accent]}`}
                aria-hidden
              >
                {initials(featuredTestimonial.name)}
              </span>
              <span className="text-center sm:text-left">
                <span className="block text-sm font-medium text-espresso">
                  {featuredTestimonial.name}
                </span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                  {featuredTestimonial.descriptor}
                </span>
              </span>
              <span className="rounded-pill border border-gold/40 bg-gold/10 px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-wider text-espresso">
                {featuredTestimonial.classBadge}
              </span>
            </figcaption>
          </div>
        </BlurFade>

        {/* Supporting testimonials */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2">
          {supportingTestimonials.map((t, i) => (
            <BlurFade key={t.name} delay={0.12 + i * 0.08} inViewMargin="-40px">
              <motion.figure
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.2 }}
                className="glass-card relative flex h-full flex-col p-8 md:p-10"
              >
                <span
                  className="pointer-events-none absolute right-6 top-4 select-none font-display text-6xl leading-none text-gold/20"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="relative flex-1 text-lg leading-relaxed text-espresso-soft">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${accentClasses[t.accent]}`}
                      aria-hidden
                    >
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-espresso">
                        {t.name}
                      </span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-muted">
                        {t.descriptor}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 rounded-pill border border-gold/40 bg-gold/10 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-wider text-espresso">
                    {t.classBadge}
                  </span>
                </figcaption>
              </motion.figure>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
