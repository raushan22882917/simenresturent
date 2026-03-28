import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface BookingForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

const timeSlots = [
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
  "9:00 PM", "10:00 PM", "11:00 PM",
];

export function BookingSection() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState<BookingForm>({
    name: "", phone: "", date: "", time: "", guests: "2", requests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi, I'd like to reserve a table at Saiemaa's!%0A%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Date:* ${form.date}%0A` +
      `*Time:* ${form.time}%0A` +
      `*Guests:* ${form.guests}%0A` +
      `*Special Requests:* ${form.requests || "None"}`;
    window.open(`https://wa.me/918108259655?text=${msg}`, "_blank");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" className="py-20 bg-[#1a1208] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, #d4af37 0%, transparent 60%), radial-gradient(circle at 70% 50%, #ff7a00 0%, transparent 60%)"
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="text-[#d4af37] text-sm font-semibold tracking-[0.3em] uppercase">Reservations</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">
            Book Your <span className="text-[#d4af37]">Table Now</span>
          </h2>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
          <p className="mt-4 text-white/60">Fill in the form and we'll confirm your booking via WhatsApp</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 reveal">
          {/* Quick actions */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="p-6 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/5">
              <h3 className="text-[#d4af37] font-bold text-lg mb-4">Quick Contact</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/918108259655?text=Hi,%20I%20want%20to%20order%20from%20Saiemaa%27s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#20ba58] transition-colors"
                >
                  <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Order on WhatsApp
                </a>
                <a
                  href="tel:+918108259655"
                  className="flex items-center gap-3 p-4 rounded-2xl border border-[#d4af37]/40 text-white font-semibold hover:bg-[#d4af37]/10 transition-colors"
                >
                  <svg className="w-6 h-6 shrink-0 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call: +91 81082 59655
                </a>
              </div>
            </div>
            <div className="p-6 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/5">
              <div className="text-[#d4af37] font-bold mb-2">Open Hours</div>
              <p className="text-white/70 text-sm">Every day: 11:00 AM – Late Night</p>
              <p className="text-[#ff7a00] text-xs mt-2">Peak: 7PM–10PM | Reserve ahead!</p>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/5">
            <h3 className="text-[#d4af37] font-bold text-lg mb-6">Table Reservation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Time *</label>
                <select
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1208] border border-white/20 text-white focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1.5 block">Number of Guests *</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a1208] border border-white/20 text-white focus:outline-none focus:border-[#d4af37]/60 transition-colors"
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-white/60 text-sm mb-1.5 block">Special Requests</label>
                <textarea
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any dietary requirements, celebrations, or special needs..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors resize-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-4 rounded-2xl font-bold text-[#1a1a1a] text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, #d4af37, #f5d070)" }}
            >
              Confirm Reservation via WhatsApp
            </button>
            <p className="text-center text-white/40 text-xs mt-3">
              Your booking details will be sent to WhatsApp for confirmation
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
