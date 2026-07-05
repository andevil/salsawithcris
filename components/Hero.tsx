"use client";

import MuxVideo from "@mux/mux-video-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { hero } from "@/lib/data";

const HERO_PLAYBACK_ID = "LgNB00c7gLG4emTMep78OyYXPwcqcfcwqeth02oj8G5X8";

const EASE = [0.22, 1, 0.36, 1] as const;

// Render the headline with the Spanish words set in italic display serif.
// "Salsa with sabor, técnica y magia." -> lead stays roman, Spanish accents italic.
function HeadlineText() {
  const text = hero.headline;
  // Split at "sabor" — everything from there on is the Spanish flourish.
  const splitAt = text.indexOf("sabor");
  if (splitAt === -1) {
    return <>{text}</>;
  }
  const lead = text.slice(0, splitAt);
  const accent = text.slice(splitAt);
  return (
    <>
      {lead}
      <span className="italic text-gold-soft">{accent}</span>
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.16, delayChildren: 0.15 },
    },
  };

  const item: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: EASE },
        },
      };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Background video — unchanged Mux setup */}
      <MuxVideo
        playbackId={HERO_PLAYBACK_ID}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ["--controls" as string]: "none" }}
      />

      {/* Warm scrim — deep-red / espresso gradient keeps text contrast high */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(27,18,13,0.55) 0%, rgba(127,21,21,0.42) 45%, rgba(27,18,13,0.62) 100%)",
        }}
        aria-hidden
      />

      {/* Coral / gold radial glow accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(249,115,91,0.28), transparent 34%), radial-gradient(circle at 82% 30%, rgba(212,160,23,0.26), transparent 32%)",
        }}
        aria-hidden
      />

      {/* Bottom fade blends into the cream page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-cream"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-6 pb-28 pt-28 text-center text-cream md:px-10"
      >
        {/* Pill badge */}
        <motion.p
          variants={item}
          className="mb-8 inline-flex items-center rounded-pill border border-cream/25 bg-cream/10 px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-cream/90 backdrop-blur-md sm:text-xs"
        >
          {hero.badge}
        </motion.p>

        {/* Editorial headline */}
        <motion.h1
          variants={item}
          className="max-w-4xl font-display font-light leading-[0.98] text-cream"
          style={{ fontSize: "clamp(3rem, 8.5vw, 6.5rem)" }}
        >
          <HeadlineText />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href={hero.ctaPrimary.href}
            className="primary-cta rounded-pill px-9 py-4 text-sm font-medium tracking-wide"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="rounded-pill border border-cream/40 px-9 py-4 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/10"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        {/* Reassurance badges — floating glass pills, staggered drift */}
        <motion.ul
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          {hero.reassuranceBadges.map((badge, i) => (
            <li
              key={badge}
              className="animate-float-drift rounded-pill border border-gold/30 bg-cream/12 px-4 py-2 text-xs font-medium tracking-wide text-cream/95 backdrop-blur-md"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              {badge}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
