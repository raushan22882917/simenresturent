import { useState, useEffect } from "react";
import { listTables, createTable, updateTable, deleteTable } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  available: "bg-green-500/20 text-green-400 border-green-500/30",
  occupied: "bg-red-500/20 text-red-400 border-red-500/30",
  reserved: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export function AdminTables() {
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ number: "", capacity: "4", location: "" });
  const [creating, setCreating] = useState(false);
  const [qrModal, setQrModal] = useState<any>(null);

  const load = async () => {
    try { setTables(await listTables()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createTable({ number: parseInt(form.number), capacity: parseInt(form.capacity), location: form.location });
      setForm({ number: "", capacity: "4", location: "" });
      setShowForm(false);
      load();
    } catch (err: any) { alert(err.message); }
    finally { setCreating(false); }
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateTable(id, { status });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this table?")) return;
    await deleteTable(id);
    load();
  };

  const printQR = (table: any) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html><head><title>QR - Table ${table.number}</title>
      <style>body{font-family:sans-serif;text-align:center;padding:40px;background:#fff;}
      h1{color:#d4af37;font-size:2rem;margin-bottom:4px;}
      p{color:#666;margin:4px 0;}img{margin:20px auto;display:block;border:4px solid #d4af37;border-radius:16px;}</style>
      </head><body>
      <h1>Saiemaa's</h1><p>Family Dining And Bar</p>
      <h2 style="font-size:1.5rem;margin:16px 0;">Table ${table.number}</h2>
      <p style="color:#888;">Capacity: ${table.capacity} guests${table.location ? ` · ${table.location}` : ""}</p>
      <img src="${table.qrCode}" width="250" height="250"/>
      <p style="margin-top:16px;color:#d4af37;font-weight:bold;">Scan to view menu & order</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm">{tables.length} tables · {tables.filter(t => t.status === "available").length} available</div>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-[#d4af37] text-[#1a1a1a] font-semibold px-5 py-2 rounded-xl text-sm hover:bg-[#f5d070] transition-colors">
          + Add Table
        </button>
      </div>

      {/* Add table form */}
      {showForm && (
        <form onSubmit={handleCreate} className="p-5 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/5 space-y-3">
          <h3 className="text-[#d4af37] font-semibold">New Table</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Table Number *</label>
              <input type="number" required value={form.number} onChange={e => setForm(f => ({...f, number: e.target.value}))}
                min="1" placeholder="e.g. 1"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Capacity</label>
              <input type="number" value={form.capacity} onChange={e => setForm(f => ({...f, capacity: e.target.value}))}
                min="1" max="20"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Location</label>
              <input type="text" value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))}
                placeholder="e.g. Window, Garden"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#d4af37]/60" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={creating}
              className="bg-[#d4af37] text-[#1a1a1a] font-semibold px-5 py-2 rounded-xl text-sm disabled:opacity-50">
              {creating ? "Creating..." : "Create Table + QR Code"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-white/50 hover:text-white text-sm px-3">Cancel</button>
          </div>
        </form>
      )}

      {/* Tables grid */}
      {tables.length === 0 ? (
        <div className="text-center py-16 text-white/40">
          <div className="text-5xl mb-4">🪑</div>
          <div>No tables yet. Add your first table to generate a QR code!</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map(table => (
            <div key={table.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[#d4af37] font-bold text-xl">Table {table.number}</div>
                  <div className="text-white/50 text-sm">{table.capacity} guests{table.location && ` · ${table.location}`}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border capitalize ${STATUS_COLORS[table.status]}`}>{table.status}</span>
                  <button onClick={() => handleDelete(table.id)} className="text-red-400/60 hover:text-red-400 text-sm">🗑</button>
                </div>
              </div>

              {/* QR Code */}
              {table.qrCode && (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={table.qrCode}
                    alt={`QR Table ${table.number}`}
                    className="w-28 h-28 rounded-xl border-2 border-[#d4af37]/30 cursor-pointer hover:border-[#d4af37] transition-colors"
                    onClick={() => setQrModal(table)}
                  />
                  <p className="text-white/40 text-xs">Scan to order</p>
                </div>
              )}

              {/* Status change */}
              <div className="flex flex-wrap gap-1.5">
                {["available", "occupied", "reserved", "inactive"].filter(s => s !== table.status).map(s => (
                  <button key={s} onClick={() => handleStatusChange(table.id, s)}
                    className="px-2 py-1 rounded-lg text-xs border border-white/20 text-white/50 hover:text-white capitalize transition-colors">
                    {s}
                  </button>
                ))}
                <button onClick={() => printQR(table)}
                  className="ml-auto px-3 py-1 rounded-lg text-xs bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 transition-colors">
                  🖨 Print QR
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Modal */}
      {qrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setQrModal(null)}>
          <div className="bg-[#0f0c07] border border-[#d4af37]/40 rounded-3xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="text-[#d4af37] font-bold text-2xl mb-1">Table {qrModal.number}</div>
            <div className="text-white/50 text-sm mb-4">{qrModal.capacity} guests{qrModal.location && ` · ${qrModal.location}`}</div>
            <img src={qrModal.qrCode} alt="QR" className="w-64 h-64 mx-auto rounded-2xl border-4 border-[#d4af37]/40" />
            <p className="mt-4 text-white/60 text-sm">Scan to view menu & order</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { printQR(qrModal); setQrModal(null); }}
                className="flex-1 bg-[#d4af37] text-[#1a1a1a] font-semibold py-3 rounded-xl">🖨 Print</button>
              <button onClick={() => setQrModal(null)} className="flex-1 border border-white/20 text-white/70 py-3 rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
