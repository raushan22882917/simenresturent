import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-serif text-primary mb-4 text-glow">SAIEMAA'S</h3>
            <p className="text-foreground/80 font-serif text-xl mb-4">साईमा फैमिली डायनिंग आणि बार</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Good Food. Great Vibes. Perfect Family Time. Serving the best authentic cuisine and signature cocktails in Thane.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Menu', 'Gallery', 'Book a Table'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="text-lg font-serif text-foreground mb-6">Opening Hours</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-foreground">11:00 AM - 1:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday - Sunday</span>
                <span className="text-foreground">11:00 AM - 2:00 AM</span>
              </li>
              <li className="pt-4 border-t border-border mt-4">
                <span className="block text-secondary font-medium mb-1">Peak Hours</span>
                7:00 PM - 10:30 PM
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Teen Hath Naka, Thane West,<br />Maharashtra, India 400604</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+918108259655" className="hover:text-primary transition-colors">081082 59655</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hello@saiemaas.com" className="hover:text-primary transition-colors">hello@saiemaas.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Saiemaa's Family Dining And Bar. All rights reserved.</p>
          <p>Made with <span className="text-red-500 animate-pulse inline-block">❤️</span> in Thane</p>
        </div>
      </div>
    </footer>
  );
}
