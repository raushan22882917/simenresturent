import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Family Dining",
    desc: "Spacious seating designed for families of all sizes. Every visit feels like home.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Bar Available",
    desc: "Premium bar with curated cocktails, mocktails, and beverages for every mood.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "10+ Years",
    desc: "Over a decade of serving Thane's families with consistent quality and love.",
  },
];

const stats = [
  { value: "10+", label: "Years of Service" },
  { value: "3960+", label: "Happy Reviews" },
  { value: "4.1★", label: "Average Rating" },
  { value: "100+", label: "Menu Items" },
];

export function AboutSection() {
  const sectionRef = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 20% 80%, #d4af37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ff7a00 0%, transparent 50%)"
      }} />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Our Story</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            About <span className="text-[#d4af37]">Saiemaa's</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
            One of the most loved family dining restaurants in Thane with great ambience,
            delicious food, and affordable pricing. Located at Teen Hath Naka, Thane West —
            your perfect destination for every occasion.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 reveal">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5">
              <div className="text-3xl font-bold text-[#d4af37]">{s.value}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <div
              key={h.title}
              className="reveal group p-8 rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all duration-300 text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/20 transition-colors">
                {h.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{h.title}</h3>
              <p className="text-white/60 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
