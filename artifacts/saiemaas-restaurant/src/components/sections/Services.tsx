import { ChefHat, ShoppingBag, Truck, Users } from 'lucide-react';

export function ServicesSection() {
  const services = [
    { icon: ChefHat, title: "Dine-in", desc: "Experience our warm hospitality and fresh food served right at your table in a premium setting." },
    { icon: ShoppingBag, title: "Takeaway", desc: "Grab your favorite meals on the go. Quick, hot, and securely packed for your convenience." },
    { icon: Truck, title: "Fast Delivery", desc: "Safe and hygienic delivery straight to your doorstep via our trusted delivery partners." },
    { icon: Users, title: "Family Events", desc: "Dedicated large tables and private sections tailored for family gatherings and parties." },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-[2rem] border border-border hover:border-secondary/50 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary">
                <svc.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-foreground mb-3">{svc.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
