import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Dine-In",
    desc: "Experience our warm, premium ambience with family-friendly seating for all group sizes.",
    color: "#d4af37",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Takeaway",
    desc: "Order your favourite dishes to go — freshly packed and ready when you are.",
    color: "#ff7a00",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "No-Contact Delivery",
    desc: "Safe, contactless home delivery. Fresh food right to your doorstep.",
    color: "#25D366",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Family Seating",
    desc: "Large comfortable tables perfect for family gatherings and celebrations.",
    color: "#d4af37",
  },
];

export function ServicesSection() {
  const sectionRef = useScrollReveal();

  return (
    <section id="services" className="py-20 bg-[#1a1a1a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Services</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            How We <span className="text-[#d4af37]">Serve You</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group text-center p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${s.color}15`, color: s.color }}
              >
                {s.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
