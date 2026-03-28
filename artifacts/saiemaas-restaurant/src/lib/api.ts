const BASE = "/api";

async function fetchJSON(url: string, opts?: RequestInit) {
  const res = await fetch(BASE + url, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// Stats
export const getStats = () => fetchJSON("/stats");

// Tables
export const listTables = () => fetchJSON("/tables");
export const getTable = (id: number) => fetchJSON(`/tables/${id}`);
export const createTable = (data: object) => fetchJSON("/tables", { method: "POST", body: JSON.stringify(data) });
export const updateTable = (id: number, data: object) => fetchJSON(`/tables/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTable = (id: number) => fetchJSON(`/tables/${id}`, { method: "DELETE" });

// Orders
export const listOrders = (params?: { status?: string; tableId?: number }) => {
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  if (params?.tableId) q.set("tableId", String(params.tableId));
  return fetchJSON(`/orders?${q}`);
};
export const createOrder = (data: object) => fetchJSON("/orders", { method: "POST", body: JSON.stringify(data) });
export const updateOrder = (id: number, data: object) => fetchJSON(`/orders/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteOrder = (id: number) => fetchJSON(`/orders/${id}`, { method: "DELETE" });

// Bookings
export const listBookings = (params?: { status?: string }) => {
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  return fetchJSON(`/bookings?${q}`);
};
export const createBooking = (data: object) => fetchJSON("/bookings", { method: "POST", body: JSON.stringify(data) });
export const updateBooking = (id: number, data: object) => fetchJSON(`/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteBooking = (id: number) => fetchJSON(`/bookings/${id}`, { method: "DELETE" });

// Contacts
export const listContacts = () => fetchJSON("/contacts");
export const createContact = (data: object) => fetchJSON("/contacts", { method: "POST", body: JSON.stringify(data) });
export const updateContact = (id: number, data: object) => fetchJSON(`/contacts/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteContact = (id: number) => fetchJSON(`/contacts/${id}`, { method: "DELETE" });

// Menu
export const listMenuItems = (category?: string) => fetchJSON(`/menu${category ? `?category=${category}` : ""}`);
export const createMenuItem = (data: object) => fetchJSON("/menu", { method: "POST", body: JSON.stringify(data) });
export const updateMenuItem = (id: number, data: object) => fetchJSON(`/menu/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMenuItem = (id: number) => fetchJSON(`/menu/${id}`, { method: "DELETE" });
