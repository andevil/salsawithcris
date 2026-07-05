"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { navLinks, hero } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div
        className={cn(
          "mx-auto flex h-16 w-[min(1120px,calc(100%-32px))] items-center justify-between rounded-pill px-4 pl-6 transition-all duration-500 md:pl-7",
          scrolled
            ? "border border-gold/25 bg-cream/72 shadow-[0_18px_60px_rgba(27,18,13,0.12)] backdrop-blur-[18px]"
            : "border border-cream/25 bg-espresso/15 backdrop-blur-[8px]",
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          className={cn(
            "font-display text-2xl font-medium leading-none tracking-wide transition-colors duration-500",
            scrolled ? "text-espresso" : "text-cream",
          )}
          aria-label="Salsita with Cris — home"
        >
          <span className={scrolled ? "text-salsa-red" : "text-gold-soft"}>C</span>
          G
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm tracking-wide transition-colors duration-300",
                scrolled
                  ? "text-espresso-soft hover:text-salsa-red"
                  : "text-cream/90 hover:text-gold-soft",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="primary-cta rounded-pill px-6 py-2.5 text-sm font-medium tracking-wide"
          >
            Book a Class
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-pill transition-colors md:hidden",
            scrolled ? "text-espresso" : "text-cream",
          )}
        >
          <List size={26} weight="light" />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-cream md:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-3xl font-medium text-espresso">
                <span className="text-salsa-red">C</span>G
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-espresso"
              >
                <X size={28} weight="light" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-8 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.1 + i * 0.07,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="font-display text-5xl font-light text-espresso transition-colors hover:text-salsa-red"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <a
                href={hero.ctaPrimary.href}
                onClick={() => setOpen(false)}
                className="primary-cta block rounded-pill px-6 py-4 text-center text-sm font-medium tracking-wide"
              >
                {hero.ctaPrimary.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
