"use client";

import {
  EnvelopeSimple,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  type Icon,
} from "@phosphor-icons/react";
import { Dock, DockIcon } from "@/components/magicui/Dock";
import { BlurFade } from "@/components/magicui/BlurFade";
import { socialLinks, sectionCopy, type SocialLink } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS: Record<SocialLink["icon"], Icon> = {
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
  email: EnvelopeSimple,
};

export function Contact() {
  const contactContent = sectionCopy.contact;
  const emailLink = socialLinks.find((link) => link.icon === "email");

  return (
    <section id="contact" className="page-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          {/* Left */}
          <BlurFade direction="left" inViewMargin="-60px">
            <p className="mb-6 text-xs uppercase tracking-[0.25em] text-gold">
              Get in touch
            </p>
            <h2 className="font-display text-5xl font-light leading-[1.05] text-espresso sm:text-6xl md:text-7xl">
              Let&rsquo;s
              <br />
              <span className="italic">dance together.</span>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
              {contactContent.subheading}
            </p>
          </BlurFade>

          {/* Right */}
          <BlurFade direction="right" inViewMargin="-60px" className="flex flex-col justify-center space-y-8">
            {/* Dock with social icons — wrapped in glass pill card */}
            <div className="glass-card inline-w-fit rounded-pill px-4 py-3 w-fit">
              <Dock className="border-0 bg-transparent px-0">
                {socialLinks.map((link) => {
                  const IconCmp = ICONS[link.icon];
                  return (
                    <DockIcon key={link.label}>
                      <a
                        href={link.href}
                        target={link.icon === "email" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-full w-full items-center justify-center text-espresso transition-colors hover:text-salsa-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <IconCmp size={26} weight="light" />
                      </a>
                    </DockIcon>
                  );
                })}
              </Dock>
            </div>

            {/* Handle list */}
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label} className="flex items-baseline gap-4">
                  <span className="w-24 text-xs uppercase tracking-[0.2em] text-muted">
                    {link.label}
                  </span>
                  <a
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-sm text-espresso transition-colors hover:text-salsa-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {link.handle}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA buttons row */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
              <a
                href="#booking"
                className="primary-cta inline-block rounded-pill px-6 py-2.5 text-sm font-medium text-center"
              >
                Book a Class
              </a>
              <a
                href="#booking"
                className="inline-block rounded-pill border-2 border-gold px-6 py-2.5 text-sm font-medium text-espresso transition-colors hover:bg-gold hover:bg-opacity-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Ask about private lessons
              </a>
              <a
                href={emailLink?.href || "mailto:andresgarzong@gmail.com"}
                className="inline-block rounded-pill border-2 border-muted px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-salsa-red hover:text-salsa-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Invite Cristhian to your event
              </a>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
