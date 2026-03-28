import { useRef } from "react";

const BASE_URL = import.meta.env.BASE_URL;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= Math.round(rating) ? "text-[#d4af37]" : "text-white/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function HeroSection({ lang }: { lang: "en" | "mr" }) {
  const bookingRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d0805 0%, #1a1208 30%, #2a1a05 60%, #1a1208 100%)",
      }}
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${BASE_URL}images/hero-bg.png)` }}
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Decorative gold lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 backdrop-blur-sm border border-[#d4af37]/40 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[#d4af37] text-sm font-medium">Currently Open · Peak Hours: 7PM – 10PM</span>
        </div>

        {/* Main title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
          {lang === "en" ? (
            <>
              <span className="text-[#d4af37]">Saiemaa's</span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">Family Dining And Bar</span>
            </>
          ) : (
            <>
              <span className="text-[#d4af37]">साईमा</span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl font-semibold">फैमिली डायनिंग आणि बार</span>
            </>
          )}
        </h1>

        {/* Hindi name */}
        {lang === "en" && (
          <p className="text-[#d4af37]/70 text-lg mb-4 font-medium">
            साईमा फैमिली डायनिंग आणि बार
          </p>
        )}

        {/* Tagline */}
        <p className="text-white/80 text-lg sm:text-xl md:text-2xl mb-6 font-light tracking-wide">
          {lang === "en"
            ? "Good Food. Great Vibes. Perfect Family Time."
            : "चांगलं जेवण. मस्त वातावरण. परिपूर्ण कौटुंबिक वेळ."}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <StarRating rating={4.1} />
          <span className="text-white font-bold text-lg">4.1</span>
          <span className="text-white/60 text-sm">(3,960+ reviews)</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("#booking")}
            className="group relative w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-[#1a1a1a] overflow-hidden transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #d4af37, #f5d070, #d4af37)" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reserve Table
            </span>
          </button>

          <a
            href="https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20from%20Saiemaa%27s"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white border border-[#25D366]/60 backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#25D366]/20 flex items-center justify-center gap-2"
            style={{ background: "rgba(37, 211, 102, 0.15)" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Order on WhatsApp
          </a>

          <button
            onClick={() => scrollTo("#menu")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-[#d4af37] border border-[#d4af37]/50 backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#d4af37]/10"
            style={{ background: "rgba(212, 175, 55, 0.10)" }}
          >
            View Menu
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs">Scroll to explore</span>
          <svg className="w-5 h-5 text-[#d4af37]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
