import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStats, listOrders } from "@/lib/api";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  totalBookings: number;
  pendingBookings: number;
  totalContacts: number;
  newContacts: number;
  totalTables: number;
  availableTables: number;
  occupiedTables: number;
  todayRevenue: string;
}

const statCards = (s: Stats) => [
  { label: "Today's Revenue", value: s.todayRevenue, icon: "💰", color: "#d4af37", link: "/admin/orders" },
  { label: "Active Orders", value: s.pendingOrders + (s.preparingOrders || 0), icon: "🧾", color: "#ff7a00", link: "/admin/orders" },
  { label: "Pending Bookings", value: s.pendingBookings, icon: "📅", color: "#60a5fa", link: "/admin/bookings" },
  { label: "New Contacts", value: s.newContacts, icon: "📞", color: "#34d399", link: "/admin/contacts" },
  { label: "Tables Available", value: `${s.availableTables}/${s.totalTables}`, icon: "🪑", color: "#a78bfa", link: "/admin/tables" },
  { label: "Tables Occupied", value: s.occupiedTables, icon: "🔴", color: "#f87171", link: "/admin/tables" },
];

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  preparing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  ready: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [s, o] = await Promise.all([getStats(), listOrders()]);
      setStats(s);
      setRecentOrders(o.slice(-5).reverse());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); const t = setInterval(load, 15000); return () => clearInterval(t); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats && statCards(stats).map((card) => (
          <Link key={card.label} to={card.link} className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: card.color }} />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-white/50 text-xs">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h3 className="text-white font-semibold">Recent Orders</h3>
          <Link to="/admin/orders" className="text-[#d4af37] text-sm hover:underline">View All →</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-white/40">No orders yet. Share QR codes for tables to start receiving orders!</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] text-xs font-bold">
                    T{order.tableNumber || order.tableId}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{order.customerName || "Guest"}</div>
                    <div className="text-white/40 text-xs">{new Date(order.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/70 text-sm">{order.totalAmount || "—"}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${ORDER_STATUS_COLORS[order.status] || ""}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/tables" className="p-5 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-colors text-center">
          <div className="text-3xl mb-2">🪑</div>
          <div className="text-[#d4af37] font-semibold text-sm">Manage Tables</div>
          <div className="text-white/40 text-xs mt-1">Add tables & print QR codes</div>
        </Link>
        <Link to="/admin/menu" className="p-5 rounded-2xl border border-[#ff7a00]/30 bg-[#ff7a00]/5 hover:bg-[#ff7a00]/10 transition-colors text-center">
          <div className="text-3xl mb-2">🍽️</div>
          <div className="text-[#ff7a00] font-semibold text-sm">Manage Menu</div>
          <div className="text-white/40 text-xs mt-1">Update dishes & prices</div>
        </Link>
        <Link to="/admin/bookings" className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-blue-400 font-semibold text-sm">View Bookings</div>
          <div className="text-white/40 text-xs mt-1">Confirm or assign tables</div>
        </Link>
      </div>
    </div>
  );
}
