import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listMenuItems, listTables, createOrder } from "@/lib/api";

const BASE_URL = import.meta.env.BASE_URL;

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "starters", label: "🍗 Starters" },
  { id: "main", label: "🍛 Main Course" },
  { id: "beverages", label: "🍹 Beverages" },
  { id: "desserts", label: "🍮 Desserts" },
  { id: "specials", label: "⭐ Specials" },
];

interface CartItem {
  id: number;
  name: string;
  price: string;
  qty: number;
}

export function TableOrderPage() {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [table, setTable] = useState<any>(null);
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [items, tables] = await Promise.all([listMenuItems(), listTables()]);
        setMenuItems(items.filter((i: any) => i.isAvailable));
        const t = tables.find((t: any) => t.number === parseInt(tableNumber || "0"));
        setTable(t);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [tableNumber]);

  const filtered = category === "all" ? menuItems : menuItems.filter(i => i.category === category);

  const addToCart = (item: any) => {
    setCart(c => {
      const ex = c.find(ci => ci.id === item.id);
      if (ex) return c.map(ci => ci.id === item.id ? { ...ci, qty: ci.qty + 1 } : ci);
      return [...c, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(c => {
      const ex = c.find(ci => ci.id === id);
      if (ex && ex.qty > 1) return c.map(ci => ci.id === id ? { ...ci, qty: ci.qty - 1 } : ci);
      return c.filter(ci => ci.id !== id);
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => {
    const p = parseFloat(i.price.replace(/[^0-9.]/g, "") || "0");
    return s + p * i.qty;
  }, 0);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const itemsJson = JSON.stringify(cart.map(ci => ({ name: ci.name, price: ci.price, qty: ci.qty })));
      const order = await createOrder({
        tableId: table?.id,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        items: itemsJson,
        totalAmount: `₹${total}`,
        notes: notes || undefined,
      });

      // Also open WhatsApp with order summary
      const itemsText = cart.map(ci => `${ci.qty}x ${ci.name} (${ci.price})`).join(", ");
      const msg = `Hi! I'm ordering from Table ${tableNumber}:%0A${itemsText}%0ATotal: ₹${total}${notes ? `%0ANotes: ${notes}` : ""}${customerName ? `%0AName: ${customerName}` : ""}`;
      window.open(`https://wa.me/918108259655?text=${msg}`, "_blank");
      setOrderPlaced(true);
      setCart([]);
      setShowCheckout(false);
      setShowCart(false);
    } catch (err: any) { alert("Failed to place order: " + err.message); }
    finally { setPlacing(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f0c07] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin" />
    </div>
  );

  if (orderPlaced) return (
    <div className="min-h-screen bg-[#0f0c07] flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="text-7xl mb-4">✅</div>
        <h2 className="text-[#d4af37] text-3xl font-bold mb-2">Order Placed!</h2>
        <p className="text-white/60 mb-2">Table {tableNumber} · Your order is being processed</p>
        <p className="text-white/50 text-sm mb-8">We've also sent your order details to WhatsApp. Our team will bring it to your table shortly!</p>
        <button onClick={() => setOrderPlaced(false)}
          className="bg-[#d4af37] text-[#1a1a1a] font-bold px-8 py-3 rounded-2xl hover:bg-[#f5d070] transition-colors">
          Order More
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0c07]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0a0700]/95 backdrop-blur border-b border-[#d4af37]/20 px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <div className="text-[#d4af37] font-bold">Saiemaa's</div>
            <div className="text-white/50 text-xs">Table {tableNumber}{table?.location ? ` · ${table.location}` : ""}</div>
          </div>
          <button onClick={() => setShowCart(!showCart)} className="relative flex items-center gap-2 bg-[#d4af37] text-[#1a1a1a] font-semibold px-4 py-2 rounded-full text-sm">
            🛒 Cart
            {cartCount > 0 && <span className="bg-[#1a1a1a] text-[#d4af37] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* Welcome */}
        <div className="text-center py-4 mb-4">
          <h1 className="text-2xl font-bold text-white">Welcome to <span className="text-[#d4af37]">Saiemaa's</span></h1>
          <p className="text-white/50 text-sm mt-1">Scan our menu and place your order right from your table</p>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 mb-5 scrollbar-hide">
          {CATEGORIES.filter(c => c.id === "all" || menuItems.some(i => i.category === c.id)).map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                category === cat.id ? "bg-[#d4af37] text-[#1a1a1a]" : "border border-white/20 text-white/60 hover:text-white"
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-3 pb-32">
          {filtered.map(item => {
            const cartItem = cart.find(ci => ci.id === item.id);
            return (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                {item.image && (
                  <img src={`${BASE_URL}images/${item.image}`} alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{item.name}</span>
                    {item.isPopular && <span className="text-xs bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full">⭐ Popular</span>}
                  </div>
                  {item.description && <div className="text-white/40 text-xs mt-0.5 line-clamp-1">{item.description}</div>}
                  <div className="text-[#ff7a00] font-bold mt-1">{item.price}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {cartItem ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-sm hover:bg-white/20">−</button>
                      <span className="text-[#d4af37] font-bold w-5 text-center">{cartItem.qty}</span>
                      <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-full bg-[#d4af37] text-[#1a1a1a] flex items-center justify-center text-sm hover:bg-[#f5d070]">+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="px-4 py-1.5 rounded-full bg-[#d4af37] text-[#1a1a1a] font-semibold text-sm hover:bg-[#f5d070] transition-colors">Add</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/70" onClick={() => setShowCart(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-[#0f0c07] border-t border-[#d4af37]/20 rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Your Cart</h3>
              <button onClick={() => setShowCart(false)} className="text-white/50 hover:text-white">✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-white/40">Your cart is empty</div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <span className="text-white text-sm">{item.qty}x {item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#d4af37] text-sm">₹{(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(0)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-white/70 text-sm">−</button>
                        <button onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })} className="text-[#d4af37] hover:text-[#f5d070] text-sm">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3 mb-4 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-[#d4af37] font-bold text-lg">₹{total}</span>
                </div>
                <button onClick={() => { setShowCart(false); setShowCheckout(true); }}
                  className="w-full py-4 bg-[#d4af37] text-[#1a1a1a] font-bold rounded-2xl text-base hover:bg-[#f5d070] transition-colors">
                  Place Order · ₹{total}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80" onClick={() => setShowCheckout(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-[#0f0c07] border-t border-[#d4af37]/20 rounded-t-3xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">Confirm Order</h3>
            <div className="space-y-3 mb-4">
              <input value={customerName} onChange={e => setCustomerName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50" />
              <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                placeholder="Your phone (optional)"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50" />
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                rows={2} placeholder="Special requests (optional)"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50 resize-none" />
            </div>
            <div className="text-white/60 text-sm mb-4">
              {cart.length} items · Total: <span className="text-[#d4af37] font-bold">₹{total}</span>
            </div>
            <button onClick={handlePlaceOrder} disabled={placing || cart.length === 0}
              className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl text-base disabled:opacity-50 hover:bg-[#20ba58] transition-colors flex items-center justify-center gap-2">
              {placing ? "Placing Order..." : "📱 Confirm & Send to WhatsApp"}
            </button>
            <button onClick={() => setShowCheckout(false)} className="w-full py-3 mt-2 text-white/50 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Sticky cart button */}
      {cartCount > 0 && !showCart && !showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0f0c07] to-transparent">
          <button onClick={() => setShowCart(true)}
            className="w-full max-w-2xl mx-auto flex items-center justify-between bg-[#d4af37] text-[#1a1a1a] font-bold py-4 px-6 rounded-2xl shadow-xl">
            <span>{cartCount} item{cartCount > 1 ? "s" : ""} in cart</span>
            <span>View Cart · ₹{total}</span>
          </button>
        </div>
      )}
    </div>
  );
}
