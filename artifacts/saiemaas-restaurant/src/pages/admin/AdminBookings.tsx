import { useState, useEffect } from "react";
import { listBookings, updateBooking, deleteBooking, listTables } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [b, t] = await Promise.all([listBookings(), listTables()]);
      setBookings(b.reverse());
      setTables(t);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const update = async (id: number, data: object) => {
    await updateBooking(id, data);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this booking?")) return;
    await deleteBooking(id);
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 items-center">
        {["all", "pending", "confirmed", "cancelled", "completed"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === s ? "bg-[#d4af37] text-[#1a1a1a]" : "border border-white/20 text-white/60 hover:text-white"
            }`}>
            {s} {s !== "all" && bookings.filter(b => b.status === s).length > 0 && `(${bookings.filter(b => b.status === s).length})`}
          </button>
        ))}
        <button onClick={load} className="ml-auto px-3 py-2 rounded-full border border-white/20 text-white/60 hover:text-white text-sm">↻</button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/40">No bookings found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div key={b.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{b.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">#{b.id} · {new Date(b.createdAt).toLocaleString("en-IN")}</div>
                </div>
                <button onClick={() => remove(b.id)} className="text-red-400/60 hover:text-red-400">🗑</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <div className="text-white/40 text-xs">Date</div>
                  <div className="text-white text-sm font-medium">{b.date}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <div className="text-white/40 text-xs">Time</div>
                  <div className="text-white text-sm font-medium">{b.time}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <div className="text-white/40 text-xs">Guests</div>
                  <div className="text-white text-sm font-medium">{b.guests}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <a href={`tel:${b.phone}`} className="text-[#d4af37] text-sm font-medium">{b.phone}</a>
                  <div className="text-white/40 text-xs">Phone</div>
                </div>
              </div>

              {b.requests && <div className="text-white/50 text-xs bg-white/5 rounded-lg px-3 py-2 mb-4">📝 {b.requests}</div>}

              <div className="flex flex-wrap gap-2 items-center">
                {/* Assign table */}
                <select
                  value={b.tableId || ""}
                  onChange={e => update(b.id, { tableId: e.target.value ? parseInt(e.target.value) : null })}
                  className="bg-[#0f0c07] border border-white/20 text-white text-xs rounded-lg px-3 py-1.5"
                >
                  <option value="">Assign Table</option>
                  {tables.map(t => <option key={t.id} value={t.id}>Table {t.number} (cap: {t.capacity})</option>)}
                </select>

                {["confirmed", "cancelled", "completed"].map(s => s !== b.status && (
                  <button key={s} onClick={() => update(b.id, { status: s })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-colors ${
                      s === "confirmed" ? "border-green-500/40 text-green-400 hover:bg-green-500/10" :
                      s === "cancelled" ? "border-red-500/40 text-red-400 hover:bg-red-500/10" :
                      "border-white/20 text-white/60 hover:text-white"
                    }`}>
                    {s === "confirmed" ? "✓ Confirm" : s === "cancelled" ? "✕ Cancel" : "✓ Done"}
                  </button>
                ))}

                <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}?text=Hi%20${b.name},%20your%20table%20booking%20for%20${b.date}%20at%20${b.time}%20is%20confirmed!`}
                  target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-[#25D366] text-xs hover:underline">
                  📱 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
