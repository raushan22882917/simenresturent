import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = import.meta.env.BASE_URL;

const galleryItems = [
  { src: "gallery-1.png", alt: "Restaurant Ambience", label: "Our Ambience", span: "col-span-2 row-span-2" },
  { src: "gallery-2.png", alt: "Food Platter", label: "Signature Dishes", span: "" },
  { src: "chicken-maratha.png", alt: "Chicken Maratha", label: "Chicken Maratha", span: "" },
  { src: "chicken-tandoori.png", alt: "Chicken Tandoori", label: "Tandoori Special", span: "" },
  { src: "cocktails.png", alt: "Cocktails", label: "Bar Selection", span: "" },
  { src: "mojito.png", alt: "Mojito", label: "Fresh Mojito", span: "" },
  { src: "brownie.png", alt: "Brownie", label: "Desserts", span: "" },
  { src: "paneer-curry.png", alt: "Paneer Curry", label: "Paneer Delights", span: "" },
];

export function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="gallery" className="py-20 bg-[#1a1a1a]">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Gallery</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            The <span className="text-[#d4af37]">Experience</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3 reveal">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
              onClick={() => setLightbox(`${BASE_URL}images/${item.src}`)}
            >
              <img
                src={`${BASE_URL}images/${item.src}`}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  (t.parentElement as HTMLElement).style.background = "linear-gradient(135deg, #2a1a05, #1a1208)";
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl" />
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
