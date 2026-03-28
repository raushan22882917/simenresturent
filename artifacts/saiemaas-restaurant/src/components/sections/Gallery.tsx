import { motion } from 'framer-motion';

export function GallerySection() {
  const galleryImages = [
    { src: `${import.meta.env.BASE_URL}images/gallery-1.png`, alt: "Elegant dining table setup", span: "row-span-2" },
    { src: `${import.meta.env.BASE_URL}images/gallery-2.png`, alt: "Delicious appetizers", span: "row-span-1" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&fit=crop", alt: "Premium Ambience", span: "row-span-1" }, {/* gallery restaurant interior */}
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&fit=crop", alt: "Signature Cocktails", span: "row-span-2" }, {/* gallery cocktails */}
    { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&fit=crop", alt: "Gourmet Plating", span: "row-span-1" }, {/* gallery plated food */}
    { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&fit=crop", alt: "Family Dining", span: "row-span-2" }, {/* gallery ambience */}
    { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&fit=crop", alt: "Decadent Desserts", span: "row-span-1" }, {/* gallery dessert */}
  ];

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Visual Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Glimpses of Saiemaa's</h2>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i} 
              className="break-inside-avoid relative group rounded-3xl overflow-hidden shadow-lg border border-white/5"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
