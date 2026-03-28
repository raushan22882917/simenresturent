import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BASE_URL = import.meta.env.BASE_URL;

interface MenuItem {
  id: string;
  name: string;
  nameMr?: string;
  price: string;
  description: string;
  image: string;
  popular?: boolean;
  category: string;
  ingredients: string;
  bgColor: string;
}

const menuItems: MenuItem[] = [
  {
    id: "cl",
    name: "Chicken Lollipop",
    nameMr: "चिकन लॉलीपॉप",
    price: "₹220",
    description: "Crispy fried chicken drumettes marinated in spicy masala, served with mint chutney",
    image: "chicken-lollipop.png",
    popular: true,
    category: "starters",
    ingredients: "Chicken, Spices, Ginger, Garlic, Cornflour, Lemon",
    bgColor: "from-orange-900/80 to-red-900/80",
  },
  {
    id: "ct",
    name: "Chicken Tandoori",
    nameMr: "चिकन तंदूरी",
    price: "₹280",
    description: "Slow-roasted chicken in our signature tandoor, marinated overnight in yogurt & spices",
    image: "chicken-tandoori.png",
    popular: true,
    category: "starters",
    ingredients: "Chicken, Yogurt, Tandoori Masala, Chili, Cumin",
    bgColor: "from-red-900/80 to-orange-900/80",
  },
  {
    id: "cm",
    name: "Chicken Maratha",
    nameMr: "चिकन मराठा",
    price: "₹320",
    description: "Authentic Maharashtrian style chicken curry with bold spices & coconut milk",
    image: "chicken-maratha.png",
    popular: true,
    category: "main",
    ingredients: "Chicken, Coconut Milk, Kolhapuri Masala, Onion, Tomato",
    bgColor: "from-amber-900/80 to-yellow-900/80",
  },
  {
    id: "pc",
    name: "Paneer Curry",
    nameMr: "पनीर करी",
    price: "₹220",
    description: "Soft paneer cubes in rich creamy tomato-based gravy with aromatic spices",
    image: "paneer-curry.png",
    popular: false,
    category: "main",
    ingredients: "Paneer, Tomato, Cream, Garam Masala, Fenugreek",
    bgColor: "from-yellow-900/80 to-amber-900/80",
  },
  {
    id: "mj",
    name: "Virgin Mojito",
    nameMr: "मोहितो",
    price: "₹120",
    description: "Refreshing mint & lime mocktail, the perfect companion for your meal",
    image: "mojito.png",
    popular: true,
    category: "beverages",
    ingredients: "Mint, Lime, Sugar, Soda, Ice",
    bgColor: "from-green-900/80 to-teal-900/80",
  },
  {
    id: "ck",
    name: "Signature Cocktail",
    nameMr: "कॉकटेल",
    price: "₹180",
    description: "Our bartender's special blend — smooth, sophisticated, and unforgettable",
    image: "cocktails.png",
    popular: false,
    category: "beverages",
    ingredients: "Select Spirits, Citrus, House Mix, Ice",
    bgColor: "from-purple-900/80 to-blue-900/80",
  },
  {
    id: "br",
    name: "Brownie with Ice Cream",
    nameMr: "ब्राउनी आइसक्रीम",
    price: "₹150",
    description: "Warm fudgy chocolate brownie topped with a scoop of vanilla ice cream",
    image: "brownie.png",
    popular: true,
    category: "desserts",
    ingredients: "Dark Chocolate, Butter, Eggs, Flour, Vanilla Ice Cream",
    bgColor: "from-brown-900/80 to-stone-900/80",
  },
];

const categories = [
  { id: "starters", label: "Starters" },
  { id: "main", label: "Main Course" },
  { id: "beverages", label: "Beverages" },
  { id: "desserts", label: "Desserts" },
];

function DishCard({ item, lang }: { item: MenuItem; lang: "en" | "mr" }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="card-3d-scene cursor-pointer"
      style={{ height: 320 }}
      onClick={() => setFlipped((f) => !f)}
      title="Click to see details"
    >
      <div className={`card-3d w-full h-full ${flipped ? "flipped" : ""}`}>
        {/* FRONT */}
        <div className="card-3d-face w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <div className={`w-full h-full bg-gradient-to-br ${item.bgColor} relative`}>
            <img
              src={`${BASE_URL}images/${item.image}`}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            {item.popular && (
              <div className="absolute top-3 left-3 bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Popular
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-[#ff7a00] text-white text-sm font-bold px-3 py-1 rounded-full">
              {item.price}
            </div>
            <div className="absolute bottom-3 left-4">
              <h3 className="text-white font-bold text-lg leading-tight">
                {lang === "mr" && item.nameMr ? item.nameMr : item.name}
              </h3>
              <p className="text-white/50 text-xs mt-1">Click to flip for details ↻</p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="card-3d-face card-3d-back w-full h-full rounded-3xl overflow-hidden shadow-2xl">
          <div className="w-full h-full bg-[#1a1208] border border-[#d4af37]/30 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[#d4af37] font-bold text-xl leading-tight">
                  {lang === "mr" && item.nameMr ? item.nameMr : item.name}
                </h3>
                {item.popular && (
                  <span className="bg-[#d4af37] text-[#1a1a1a] text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="border-t border-[#d4af37]/20 pt-3">
                <p className="text-[#d4af37]/60 text-xs uppercase tracking-wider mb-1">Ingredients</p>
                <p className="text-white/60 text-sm">{item.ingredients}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#ff7a00]">{item.price}</span>
              <a
                href={`https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20${encodeURIComponent(item.name)}%20from%20Saiemaa's`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#20ba58] transition-colors"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MenuSection({ lang }: { lang: "en" | "mr" }) {
  const [activeCategory, setActiveCategory] = useState("starters");
  const sectionRef = useScrollReveal();

  const filtered = menuItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-[#0f0c07] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, #d4af37 0%, transparent 70%)"
      }} />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Our Menu</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            Chef's <span className="text-[#d4af37]">Specialties</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <p className="mt-4 text-white/50 text-sm">Click on any dish card to see details & order</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#d4af37] text-[#1a1a1a] shadow-lg shadow-[#d4af37]/30"
                  : "border border-[#d4af37]/30 text-[#d4af37]/70 hover:border-[#d4af37]/60 hover:text-[#d4af37]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <div key={item.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <DishCard item={item} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
