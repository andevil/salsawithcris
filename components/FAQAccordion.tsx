"use client";

import { useState } from "react";
import { Plus, CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/magicui/BlurFade";
import { faqItems, sectionCopy } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const faqContent = sectionCopy.faq;

  return (
    <section
      id="faq"
      className="page-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">
            FAQ
          </p>
          <h2 className="font-display text-5xl font-light leading-tight text-espresso sm:text-6xl">
            {faqContent.heading}
          </h2>
        </div>

        {/* FAQ items */}
        <div className="mx-auto max-w-2xl space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <BlurFade
                key={index}
                delay={index * 0.05}
                className="glass-card overflow-hidden rounded-lg"
              >
                <motion.button
                  id={buttonId}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={cn(
                    "w-full px-6 py-5 text-left transition-colors",
                    "hover:bg-cream-soft focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                    isOpen && "bg-cream-soft"
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-espresso">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                      className="flex-shrink-0 text-gold"
                    >
                      {isOpen ? (
                        <CaretDown size={20} weight="bold" />
                      ) : (
                        <Plus size={20} weight="bold" />
                      )}
                    </motion.div>
                  </div>
                </motion.button>

                {/* Answer panel */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0.2 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gold border-opacity-20 px-6 py-5 text-sm leading-relaxed text-muted">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BlurFade>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <a
            href="#booking"
            className="primary-cta inline-block px-8 py-3 text-base font-medium transition-all"
          >
            Book your first class
          </a>
        </div>
      </div>
    </section>
  );
}
