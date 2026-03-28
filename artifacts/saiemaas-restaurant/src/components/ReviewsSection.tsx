import { useScrollReveal } from "@/hooks/useScrollReveal";

const reviews = [
  {
    name: "Rahul M.",
    avatar: "R",
    rating: 5,
    date: "March 2026",
    text: "Absolutely amazing ambience! The Chicken Maratha was out of this world. Perfect place for a family dinner. Will definitely come back!",
    highlight: "Amazing Ambience",
  },
  {
    name: "Priya S.",
    avatar: "P",
    rating: 4,
    date: "February 2026",
    text: "Best family restaurant in Thane. The food quality is consistently great and the staff is very polite. Love the cozy atmosphere!",
    highlight: "Best Family Spot",
  },
  {
    name: "Amit K.",
    avatar: "A",
    rating: 5,
    date: "February 2026",
    text: "Great taste and very affordable for the quality you get. The Chicken Lollipop is a must try. Highly recommended!",
    highlight: "Great Value",
  },
  {
    name: "Sneha P.",
    avatar: "S",
    rating: 4,
    date: "January 2026",
    text: "The cocktails are fantastic and the food pairs perfectly with them. The bar selection is impressive. Great night out spot!",
    highlight: "Amazing Bar",
  },
  {
    name: "Vikram D.",
    avatar: "V",
    rating: 5,
    date: "January 2026",
    text: "Visited with my whole family of 10 people. The staff handled everything perfectly. Food came hot and fresh. 10/10 experience!",
    highlight: "Family Friendly",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? "text-[#d4af37]" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section id="reviews" className="py-20 bg-[#0f0c07]">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Reviews</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            What Our <span className="text-[#d4af37]">Guests Say</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <div className="mt-6 inline-flex items-center gap-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full px-6 py-3">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#d4af37] font-bold text-lg">4.1</span>
            <span className="text-white/60 text-sm">based on 3,960+ Google reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="reveal p-6 rounded-3xl border border-[#d4af37]/20 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/40 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-bold text-lg shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold">{r.name}</h4>
                    <span className="text-[#d4af37]/60 text-xs">{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                </div>
              </div>
              <span className="inline-block bg-[#d4af37]/15 text-[#d4af37] text-xs font-medium px-3 py-1 rounded-full mb-3">
                {r.highlight}
              </span>
              <p className="text-white/70 text-sm leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
