import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReviewsSection() {
  const reviews = [
    { name: "Rahul M.", rating: 5, text: "Amazing ambience, food was delicious! The chicken maratha is an absolute must try. Service was top notch.", date: "2 weeks ago" },
    { name: "Priya S.", rating: 4, text: "Best family restaurant in Thane. Staff is very courteous and quick. Portions are generous.", date: "1 month ago" },
    { name: "Amit K.", rating: 5, text: "Great taste and affordable. We celebrate all our birthdays here. Highly recommended for large groups.", date: "3 months ago" },
    { name: "Sneha P.", rating: 5, text: "Love the elegant bar vibe and the signature cocktails. 10/10 experience!", date: "1 week ago" },
    { name: "Vikram D.", rating: 4, text: "Good portions and great authentic taste. The 360 degree service is impressive.", date: "2 months ago" },
    { name: "Anjali R.", rating: 5, text: "The perfect weekend spot. The lighting and music create a wonderful dining experience.", date: "Just now" }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#0a0a0a] border-y border-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">What Our Guests Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Join thousands of happy families who have made Saiemaa's their go-to dining destination in Thane.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i} 
              className="bg-card border border-border p-8 rounded-[2rem] shadow-xl hover:border-primary/40 transition-colors group relative"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-foreground/90 italic mb-8 leading-relaxed text-lg font-serif">"{r.text}"</p>
              <div className="flex justify-between items-center border-t border-border/50 pt-4 mt-auto">
                <span className="font-bold text-foreground tracking-wide">{r.name}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{r.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
