import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { id: 1, name: "Chicken Lollipop", category: "Starters", price: 220, popular: true, img: `${import.meta.env.BASE_URL}images/chicken-lollipop.png`, desc: "Crispy fried chicken wings tossed in spicy Schezwan sauce.", ingredients: "Chicken wings, ginger, garlic, soy sauce, secret spices" },
  { id: 2, name: "Chicken Tandoori", category: "Starters", price: 280, popular: true, img: `${import.meta.env.BASE_URL}images/chicken-tandoori.png`, desc: "Classic smoky chicken marinated in yogurt and traditional spices.", ingredients: "Whole chicken, yogurt, tandoori masala, lemon, mustard oil" },
  { id: 3, name: "Chicken Maratha", category: "Main Course", price: 320, popular: true, img: `${import.meta.env.BASE_URL}images/chicken-maratha.png`, desc: "Spicy and rich Maharashtrian style chicken curry.", ingredients: "Chicken, roasted coconut, dry red chilies, signature garam masala" },
  { id: 4, name: "Paneer Butter Masala", category: "Main Course", price: 220, popular: false, img: `${import.meta.env.BASE_URL}images/paneer-curry.png`, desc: "Soft paneer cubes in a velvety tomato and butter gravy.", ingredients: "Paneer, fresh tomatoes, butter, fresh cream, cashew paste" },
  { id: 5, name: "Fresh Lime Mojito", category: "Beverages", price: 120, popular: false, img: `${import.meta.env.BASE_URL}images/mojito.png`, desc: "Refreshing mocktail with fresh mint and crushed lime.", ingredients: "Mint leaves, lime wedges, club soda, sugar syrup, crushed ice" },
  { id: 6, name: "Signature Cocktail", category: "Beverages", price: 180, popular: true, img: `${import.meta.env.BASE_URL}images/cocktails.png`, desc: "Our bartender's special glowing concoction.", ingredients: "Secret house blend, exotic fruit juices, premium spirits, ice" },
  { id: 7, name: "Sizzling Brownie", category: "Desserts", price: 150, popular: true, img: `${import.meta.env.BASE_URL}images/brownie.png`, desc: "Hot chocolate brownie topped with cold vanilla ice cream.", ingredients: "Dark chocolate, roasted walnuts, vanilla ice cream, hot fudge sauce" },
];

const categories = ['All', 'Starters', 'Main Course', 'Beverages', 'Desserts'];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filtered = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(i => i.category === activeCategory);

  return (
    <section id="menu" className="py-32 bg-[#0a0a0a] relative z-10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Taste The Magic</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-8">Our Menu Highlights</h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                    : 'bg-card text-foreground border border-border hover:border-primary/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <DishCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center">
          <button 
            onClick={() => window.open('https://wa.me/918108259655?text=Hi,%20can%20I%20see%20the%20full%20menu?', '_blank')}
            className="text-primary hover:text-primary/80 font-bold tracking-widest uppercase border-b-2 border-primary pb-1 transition-colors"
          >
            Request Full Menu via WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}

function DishCard({ item }: { item: any }) {
  return (
    <div className="group perspective-1000 w-full h-[420px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
        
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-card rounded-[2rem] overflow-hidden border border-border group-hover:border-primary/30 transition-colors shadow-xl">
          <div className="relative h-56 w-full">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
            {item.popular && (
              <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Popular
              </div>
            )}
          </div>
          <div className="p-6 text-center relative -mt-6">
            <h3 className="text-2xl font-serif text-foreground mb-3">{item.name}</h3>
            <div className="w-12 h-[2px] bg-primary/50 mx-auto mb-4"></div>
            <p className="text-primary font-bold text-xl">₹{item.price}</p>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest">Hover for details</p>
          </div>
        </div>
        
        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-card rounded-[2rem] border-2 border-primary/50 p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-gradient-to-b from-card to-[#15130b]">
          <h3 className="text-2xl font-serif text-primary mb-4">{item.name}</h3>
          <p className="text-foreground/90 mb-6 italic leading-relaxed text-sm">{item.desc}</p>
          <div className="text-xs text-muted-foreground bg-background p-4 rounded-2xl w-full border border-border">
            <span className="text-secondary font-semibold block mb-2 uppercase tracking-wider">Ingredients</span>
            {item.ingredients}
          </div>
          <button 
            onClick={(e) => {
               e.stopPropagation();
               window.open(`https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20${encodeURIComponent(item.name)}`, '_blank');
            }}
            className="mt-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg w-full"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  )
}
