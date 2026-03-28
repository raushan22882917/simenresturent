import { useState, useEffect } from "react";
import { listOrders, updateOrder, deleteOrder } from "@/lib/api";

const STATUS_OPTIONS = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  preparing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  ready: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await listOrders();
      setOrders(data.reverse());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); const t = setInterval(load, 10000); return () => clearInterval(t); }, []);

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const handleStatusChange = async (id: number, status: string) => {
    await updateOrder(id, { status });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    await deleteOrder(id);
    load();
  };

  const parseItems = (items: string) => {
    try { return JSON.parse(items); } catch { return [{ name: items, qty: 1, price: "" }]; }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-5">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", ...STATUS_OPTIONS].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
              filter === s ? "bg-[#d4af37] text-[#1a1a1a]" : "border border-white/20 text-white/60 hover:text-white"
            }`}>
            {s} {s !== "all" && orders.filter(o => o.status === s).length > 0 && `(${orders.filter(o => o.status === s).length})`}
          </button>
        ))}
        <button onClick={load} className="ml-auto px-3 py-2 rounded-full border border-white/20 text-white/60 hover:text-white text-sm">↻ Refresh</button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 text-white/40">No orders {filter !== "all" ? `with status "${filter}"` : "yet"}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af37] font-bold">Table {order.tableNumber || order.tableId}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">
                    {new Date(order.createdAt).toLocaleString("en-IN")} · Order #{order.id}
                  </div>
                </div>
                <button onClick={() => handleDelete(order.id)} className="text-red-400/60 hover:text-red-400 text-lg p-1">🗑</button>
              </div>

              {(order.customerName || order.customerPhone) && (
                <div className="text-sm text-white/70">
                  {order.customerName && <span className="mr-3">👤 {order.customerName}</span>}
                  {order.customerPhone && <a href={`tel:${order.customerPhone}`} className="text-[#d4af37]">📞 {order.customerPhone}</a>}
                </div>
              )}

              {/* Items */}
              <div className="space-y-1">
                {parseItems(order.items).map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/80">{item.qty > 1 ? `${item.qty}x ` : ""}{item.name}</span>
                    <span className="text-[#d4af37]">{item.price}</span>
                  </div>
                ))}
              </div>

              {order.totalAmount && (
                <div className="flex justify-between text-sm font-semibold border-t border-white/10 pt-2">
                  <span className="text-white/60">Total</span>
                  <span className="text-[#d4af37]">{order.totalAmount}</span>
                </div>
              )}

              {order.notes && <div className="text-white/50 text-xs bg-white/5 rounded-lg px-3 py-2">📝 {order.notes}</div>}

              {/* Status update */}
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.filter(s => s !== order.status).map(s => (
                  <button key={s} onClick={() => handleStatusChange(order.id, s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors capitalize">
                    → {s}
                  </button>
                ))}
              </div>

              {/* WhatsApp */}
              {order.customerPhone && (
                <a href={`https://wa.me/${order.customerPhone.replace(/\D/g, "")}?text=Hi%20${order.customerName || ""},%20your%20order%20is%20${order.status}!`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] text-xs hover:underline">
                  📱 Message on WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
