import { Router, type IRouter } from "express";
import { db, bookings } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

function fmt(b: typeof bookings.$inferSelect) {
  return { ...b, createdAt: b.createdAt?.toISOString() };
}

router.get("/bookings", async (req, res) => {
  try {
    const { status } = req.query;
    const rows = await db.select().from(bookings).orderBy(bookings.createdAt);
    res.json((status ? rows.filter(b => b.status === status) : rows).map(fmt));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const { name, phone, date, time, guests, requests } = req.body;
    const [booking] = await db.insert(bookings).values({
      name, phone, date, time, guests: parseInt(guests) || 2, requests, status: "pending",
    }).returning();
    res.status(201).json(fmt(booking));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.put("/bookings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, tableId, notes } = req.body;
    const [booking] = await db.update(bookings)
      .set({
        ...(status && { status }),
        ...(tableId !== undefined && { tableId }),
        ...(notes !== undefined && { notes }),
      })
      .where(eq(bookings.id, id))
      .returning();
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(fmt(booking));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    await db.delete(bookings).where(eq(bookings.id, parseInt(req.params.id)));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

export default router;
