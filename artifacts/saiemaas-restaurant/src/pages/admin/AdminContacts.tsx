import { useState, useEffect } from "react";
import { listContacts, updateContact, deleteContact } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  read: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  replied: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [editingNotes, setEditingNotes] = useState<{ [id: number]: string }>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await listContacts();
      setContacts(data.reverse());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? contacts : contacts.filter(c => c.status === filter);

  const update = async (id: number, data: object) => {
    await updateContact(id, data);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this contact?")) return;
    await deleteContact(id);
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2 items-center">
        {["all", "new", "read", "replied", "closed"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === s ? "bg-[#d4af37] text-[#1a1a1a]" : "border border-white/20 text-white/60 hover:text-white"
            }`}>
            {s} {s !== "all" && contacts.filter(c => c.status === s).length > 0 && `(${contacts.filter(c => c.status === s).length})`}
          </button>
        ))}
        <button onClick={load} className="ml-auto px-3 py-2 rounded-full border border-white/20 text-white/60 hover:text-white text-sm">↻</button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-white/40">No contacts found</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">{new Date(c.createdAt).toLocaleString("en-IN")}</div>
                </div>
                <button onClick={() => remove(c.id)} className="text-red-400/60 hover:text-red-400">🗑</button>
              </div>

              <div className="flex flex-wrap gap-4 mb-3 text-sm">
                <a href={`tel:${c.phone}`} className="text-[#d4af37] hover:underline">📞 {c.phone}</a>
                {c.email && <a href={`mailto:${c.email}`} className="text-blue-400 hover:underline">✉️ {c.email}</a>}
              </div>

              {c.message && <div className="text-white/70 text-sm bg-white/5 rounded-lg px-3 py-2 mb-3">"{c.message}"</div>}

              {/* Notes */}
              <div className="mb-3">
                <textarea
                  rows={2}
                  placeholder="Add internal notes..."
                  value={editingNotes[c.id] ?? c.notes ?? ""}
                  onChange={e => setEditingNotes(n => ({ ...n, [c.id]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/70 text-xs resize-none focus:outline-none focus:border-[#d4af37]/40"
                />
                {editingNotes[c.id] !== undefined && (
                  <button onClick={() => { update(c.id, { notes: editingNotes[c.id] }); setEditingNotes(n => { const x = {...n}; delete x[c.id]; return x; }); }}
                    className="mt-1 text-[#d4af37] text-xs hover:underline">Save notes</button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {["read", "replied", "closed"].map(s => s !== c.status && (
                  <button key={s} onClick={() => update(c.id, { status: s })}
                    className="px-3 py-1.5 rounded-lg text-xs border border-white/20 text-white/60 hover:text-white capitalize transition-colors">
                    Mark {s}
                  </button>
                ))}
                <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}?text=Hi%20${c.name},%20thank%20you%20for%20contacting%20Saiemaa's!`}
                  target="_blank" rel="noopener noreferrer"
                  className="ml-auto text-[#25D366] text-xs hover:underline">📱 WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
