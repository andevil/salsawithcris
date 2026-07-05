import { MusicNote } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/magicui/Marquee";
import { styleKeywords } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StyleStrip() {
  return (
    <div
      className="border-y border-gold/20 py-1"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,249,240,1) 0%, rgba(243,210,122,0.22) 50%, rgba(255,249,240,1) 100%)",
      }}
    >
      <Marquee pauseOnHover className="[--duration:60s] [--gap:0rem] py-4">
        {styleKeywords.map((word, i) => {
          // Alternate serif italic / sans uppercase; accent every 3rd word red.
          const isSerif = i % 2 === 0;
          const isAccent = i % 3 === 0;
          return (
            <span key={word} className="flex items-center">
              <span
                className={cn(
                  "whitespace-nowrap",
                  isSerif
                    ? "font-display text-2xl italic sm:text-3xl"
                    : "text-lg uppercase tracking-[0.22em] sm:text-xl",
                  isAccent ? "text-salsa-red" : "text-espresso-soft",
                )}
              >
                {word}
              </span>
              <MusicNote
                size={18}
                weight="fill"
                className="mx-6 text-gold"
                aria-hidden
              />
            </span>
          );
        })}
      </Marquee>
    </div>
  );
}
