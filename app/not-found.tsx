import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found · Salsita with Cris",
};

export default function NotFound() {
  return (
    <div className="portfolio-root flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl md:text-6xl">
        Off the <span className="italic">dance floor.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mid">
        This page doesn&rsquo;t exist, or has moved. Let&rsquo;s get you back
        to the rhythm.
      </p>
      <Link
        href="/"
        className="mt-10 bg-gold px-8 py-4 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </div>
  );
}
