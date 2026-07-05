import { navLinks, brand } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-espresso border-opacity-10 bg-espresso">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 py-12 text-sm md:flex-row md:justify-between md:px-10">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-display text-2xl font-light text-cream">
            {brand.brandName}
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-gold">
            Budapest
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="text-cream text-opacity-70">
          © {year} {brand.brandName}
        </span>
      </div>
    </footer>
  );
}
