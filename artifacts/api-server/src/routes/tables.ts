import { Router, type IRouter } from "express";
import { db, restaurantTables } from "@workspace/db";
import { eq } from "drizzle-orm";
import QRCode from "qrcode";

const router: IRouter = Router();

const BASE_DOMAIN = process.env.REPLIT_DOMAINS?.split(",")[0] || "localhost:80";

router.get("/tables", async (req, res) => {
  try {
    const tables = await db.select().from(restaurantTables).orderBy(restaurantTables.number);
    res.json(tables.map(t => ({
      ...t,
      createdAt: t.createdAt?.toISOString(),
    })));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch tables" });
  }
});

router.get("/tables/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [table] = await db.select().from(restaurantTables).where(eq(restaurantTables.id, id));
    if (!table) return res.status(404).json({ error: "Table not found" });
    res.json({ ...table, createdAt: table.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch table" });
  }
});

router.post("/tables", async (req, res) => {
  try {
    const { number, capacity = 4, location, status = "available" } = req.body;
    const tableUrl = `https://${BASE_DOMAIN}/table/${number}`;
    const qrCode = await QRCode.toDataURL(tableUrl, { width: 300, margin: 2 });

    const [table] = await db.insert(restaurantTables).values({
      number,
      capacity,
      location,
      status,
      qrCode,
    }).returning();
    res.status(201).json({ ...table, createdAt: table.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create table" });
  }
});

router.put("/tables/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { capacity, location, status } = req.body;
    const [table] = await db.update(restaurantTables)
      .set({ ...(capacity && { capacity }), ...(location !== undefined && { location }), ...(status && { status }) })
      .where(eq(restaurantTables.id, id))
      .returning();
    if (!table) return res.status(404).json({ error: "Table not found" });
    res.json({ ...table, createdAt: table.createdAt?.toISOString() });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update table" });
  }
});

router.delete("/tables/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(restaurantTables).where(eq(restaurantTables.id, id));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete table" });
  }
});

export default router;
