"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="portfolio-root flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">
        Something went wrong
      </p>
      <h1 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl md:text-6xl">
        A misstep <span className="italic">in the routine.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mid">
        We hit an unexpected error. Give it another try, or head back to the
        homepage.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="bg-gold px-8 py-4 text-sm font-medium tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex items-center justify-center border border-divider px-8 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:border-gold hover:text-gold"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
