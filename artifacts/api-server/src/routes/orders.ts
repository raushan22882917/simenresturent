import { Router, type IRouter } from "express";
import { db, orders, restaurantTables } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

function formatOrder(o: typeof orders.$inferSelect) {
  return {
    ...o,
    createdAt: o.createdAt?.toISOString(),
    updatedAt: o.updatedAt?.toISOString(),
  };
}

router.get("/orders", async (req, res) => {
  try {
    const { status, tableId } = req.query;
    let query = db.select().from(orders);
    const rows = await query.orderBy(orders.createdAt);
    let result = rows;
    if (status) result = result.filter(o => o.status === status);
    if (tableId) result = result.filter(o => o.tableId === parseInt(tableId as string));
    res.json(result.map(formatOrder));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(formatOrder(order));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { tableId, customerName, customerPhone, items, totalAmount, notes } = req.body;

    // Get table number for reference
    let tableNumber: number | undefined;
    if (tableId) {
      const [table] = await db.select().from(restaurantTables).where(eq(restaurantTables.id, tableId));
      tableNumber = table?.number;
      // Mark table as occupied
      if (table) {
        await db.update(restaurantTables).set({ status: "occupied" }).where(eq(restaurantTables.id, tableId));
      }
    }

    const [order] = await db.insert(orders).values({
      tableId,
      tableNumber,
      customerName,
      customerPhone,
      items,
      totalAmount,
      notes,
      status: "pending",
    }).returning();
    res.status(201).json(formatOrder(order));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.put("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes, totalAmount } = req.body;
    const [order] = await db.update(orders)
      .set({
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(totalAmount && { totalAmount }),
        updatedAt: new Date(),
      })
      .where(eq(orders.id, id))
      .returning();
    if (!order) return res.status(404).json({ error: "Order not found" });

    // If completed/cancelled, free the table
    if (status === "completed" || status === "cancelled") {
      const pendingOrders = await db.select().from(orders)
        .where(and(eq(orders.tableId, order.tableId)));
      const active = pendingOrders.filter(o => o.id !== id && !["completed", "cancelled"].includes(o.status));
      if (active.length === 0) {
        await db.update(restaurantTables).set({ status: "available" }).where(eq(restaurantTables.id, order.tableId));
      }
    }

    res.json(formatOrder(order));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

router.delete("/orders/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(orders).where(eq(orders.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

export default router;
