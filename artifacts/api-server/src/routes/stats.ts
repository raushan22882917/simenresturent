import { Router, type IRouter } from "express";
import { db, orders, bookings, contacts, restaurantTables } from "@workspace/db";

const router: IRouter = Router();

router.get("/stats", async (req, res) => {
  try {
    const [allOrders, allBookings, allContacts, allTables] = await Promise.all([
      db.select().from(orders),
      db.select().from(bookings),
      db.select().from(contacts),
      db.select().from(restaurantTables),
    ]);

    const today = new Date().toDateString();
    const todayOrders = allOrders.filter(o => new Date(o.createdAt).toDateString() === today && o.status === "completed");
    const todayRevenue = todayOrders.reduce((sum, o) => {
      const amt = parseFloat(o.totalAmount?.replace(/[^0-9.]/g, "") || "0");
      return sum + amt;
    }, 0);

    res.json({
      totalOrders: allOrders.length,
      pendingOrders: allOrders.filter(o => o.status === "pending").length,
      preparingOrders: allOrders.filter(o => o.status === "preparing").length,
      totalBookings: allBookings.length,
      pendingBookings: allBookings.filter(b => b.status === "pending").length,
      totalContacts: allContacts.length,
      newContacts: allContacts.filter(c => c.status === "new").length,
      totalTables: allTables.length,
      availableTables: allTables.filter(t => t.status === "available").length,
      occupiedTables: allTables.filter(t => t.status === "occupied").length,
      todayRevenue: `₹${todayRevenue.toFixed(0)}`,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
