import { Utensils, Wine, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[150px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Welcome To</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">Our Legacy</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            One of the most loved family dining restaurants in Thane. For over a decade, we have been serving authentic recipes made with love, creating the perfect ambience for your family celebrations and weekend getaways.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { icon: Utensils, title: "Family Dining", desc: "Spacious, comfortable seating designed for families of all sizes to enjoy meals and create memories together." },
            { icon: Wine, title: "Premium Bar", desc: "A fully stocked bar featuring signature cocktails, mocktails, and premium spirits to elevate your evening." },
            { icon: Award, title: "10+ Years Legacy", desc: "A decade of consistent taste, impeccable quality, and warm hospitality that keeps our guests coming back." },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-card p-10 rounded-[2rem] border border-border hover:border-primary/50 transition-all duration-500 text-center group hover:-translate-y-2 shadow-xl hover:shadow-primary/10"
            >
              <div className="w-24 h-24 mx-auto bg-background border border-border text-primary rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 shadow-inner">
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
