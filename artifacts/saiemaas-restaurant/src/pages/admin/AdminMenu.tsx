import { useState, useEffect } from "react";
import { listMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "@/lib/api";

const CATEGORIES = ["starters", "main", "beverages", "desserts", "specials"];

const defaultForm = {
  name: "", nameMr: "", category: "starters", price: "", description: "", ingredients: "", isPopular: false, isAvailable: true,
};

export function AdminMenu() {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { setItems(await listMenuItems()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? items : items.filter(i => i.category === filter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) { await updateMenuItem(editingId, form); }
      else { await createMenuItem(form); }
      setForm(defaultForm);
      setShowForm(false);
      setEditingId(null);
      load();
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const startEdit = (item: any) => {
    setForm({ name: item.name, nameMr: item.nameMr || "", category: item.category, price: item.price, description: item.description || "", ingredients: item.ingredients || "", isPopular: item.isPopular, isAvailable: item.isAvailable });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this menu item?")) return;
    await deleteMenuItem(id);
    load();
  };

  const toggleAvailable = async (item: any) => {
    await updateMenuItem(item.id, { isAvailable: !item.isAvailable });
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm">{items.length} items · {items.filter(i => i.isAvailable).length} available</div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(defaultForm); }}
          className="bg-[#d4af37] text-[#1a1a1a] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-[#f5d070] transition-colors">
          {showForm && !editingId ? "✕ Cancel" : "+ Add Item"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/5 space-y-4">
          <h3 className="text-[#d4af37] font-semibold">{editingId ? "Edit Item" : "New Menu Item"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Name (English) *</label>
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Name (मराठी)</label>
              <input value={form.nameMr} onChange={e => setForm(f => ({...f, nameMr: e.target.value}))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                className="w-full bg-[#0f0c07] border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60">
                {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Price *</label>
              <input required value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))}
                placeholder="₹220" className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/50 text-xs mb-1 block">Description</label>
              <input value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/50 text-xs mb-1 block">Ingredients</label>
              <input value={form.ingredients} onChange={e => setForm(f => ({...f, ingredients: e.target.value}))}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPopular} onChange={e => setForm(f => ({...f, isPopular: e.target.checked}))} className="accent-[#d4af37]" />
                <span className="text-white/70 text-sm">Mark as Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isAvailable} onChange={e => setForm(f => ({...f, isAvailable: e.target.checked}))} className="accent-[#d4af37]" />
                <span className="text-white/70 text-sm">Available</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="bg-[#d4af37] text-[#1a1a1a] font-semibold px-6 py-2 rounded-xl text-sm disabled:opacity-50">
              {saving ? "Saving..." : editingId ? "Update Item" : "Add to Menu"}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(defaultForm); }} className="text-white/50 hover:text-white text-sm px-3">Cancel</button>
          </div>
        </form>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === cat ? "bg-[#d4af37] text-[#1a1a1a]" : "border border-white/20 text-white/60 hover:text-white"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className={`rounded-2xl border p-4 space-y-3 transition-all ${item.isAvailable ? "border-white/10 bg-white/5" : "border-red-500/20 bg-red-500/5 opacity-60"}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white font-semibold">{item.name}</div>
                {item.nameMr && <div className="text-white/40 text-xs">{item.nameMr}</div>}
              </div>
              <div className="text-[#ff7a00] font-bold">{item.price}</div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">{item.category}</span>
              {item.isPopular && <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37]">⭐ Popular</span>}
              {!item.isAvailable && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">Unavailable</span>}
            </div>
            {item.description && <div className="text-white/50 text-xs leading-relaxed line-clamp-2">{item.description}</div>}
            <div className="flex gap-2 pt-1">
              <button onClick={() => toggleAvailable(item)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${item.isAvailable ? "border border-red-500/30 text-red-400 hover:bg-red-500/10" : "border border-green-500/30 text-green-400 hover:bg-green-500/10"}`}>
                {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
              </button>
              <button onClick={() => startEdit(item)} className="px-3 py-1.5 rounded-lg text-xs border border-white/20 text-white/60 hover:text-white transition-colors">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-2 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 transition-colors">🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
