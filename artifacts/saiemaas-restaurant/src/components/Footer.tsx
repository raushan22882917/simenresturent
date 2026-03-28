const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Book Table", href: "#booking" },
];

export function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[#0a0700] border-t border-[#d4af37]/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#d4af37]/20">
          {/* Brand */}
          <div>
            <h3 className="text-[#d4af37] text-2xl font-bold mb-1">Saiemaa's</h3>
            <p className="text-white/40 text-sm mb-1">साईमा फैमिली डायनिंग आणि बार</p>
            <p className="text-white/40 text-sm">Family Dining And Bar</p>
            <p className="text-white/50 text-sm mt-4 leading-relaxed">
              Your favourite family dining destination in Thane West since 2014. Great food, warm ambience, amazing vibes.
            </p>
            <div className="flex gap-3 mt-5">
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Google */}
              <a href="https://maps.google.com/?q=Saiemaa's+Family+Dining+Thane" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left text-white/50 hover:text-[#d4af37] text-sm transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#d4af37] font-semibold mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-3 text-sm text-white/50">
              <p>📍 Teen Hath Naka, Thane West, MH</p>
              <p>📞 +91 81082 59655</p>
              <p>🕐 Open: 11 AM – Late Night</p>
              <a
                href="https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20from%20Saiemaa%27s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 px-4 py-2 rounded-xl hover:bg-[#25D366]/30 transition-colors mt-2 w-fit"
              >
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <p>© 2026 Saiemaa's Family Dining And Bar. All rights reserved.</p>
          <p>Made with ❤️ in Thane</p>
        </div>
      </div>
    </footer>
  );
}
