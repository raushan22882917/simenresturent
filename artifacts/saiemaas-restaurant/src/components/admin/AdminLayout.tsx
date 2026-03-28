import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { path: "/admin/orders", label: "Orders", icon: "🧾" },
  { path: "/admin/bookings", label: "Bookings", icon: "📅" },
  { path: "/admin/contacts", label: "Contacts", icon: "📞" },
  { path: "/admin/tables", label: "Tables & QR", icon: "🪑" },
  { path: "/admin/menu", label: "Menu Items", icon: "🍽️" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0f0c07] border-r border-[#d4af37]/20 transform transition-transform duration-300 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="p-5 border-b border-[#d4af37]/20">
          <div className="text-[#d4af37] font-bold text-lg">Saiemaa's</div>
          <div className="text-[#d4af37]/50 text-xs">Admin Dashboard</div>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#d4af37] text-[#1a1a1a]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#d4af37]/20">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-[#0a0700]/90 backdrop-blur border-b border-[#d4af37]/20 px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="text-white font-semibold text-sm sm:text-base">
            {navItems.find(n => n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path))?.label || "Dashboard"}
          </div>
          <div className="text-[#d4af37]/60 text-xs">
            {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
