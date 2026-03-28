import { Router, type IRouter } from "express";
import { db, menuItems } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();
const fmt = (m: typeof menuItems.$inferSelect) => ({ ...m, createdAt: m.createdAt?.toISOString() });

router.get("/menu", async (req, res) => {
  try {
    const { category } = req.query;
    const rows = await db.select().from(menuItems).orderBy(menuItems.category, menuItems.name);
    res.json((category ? rows.filter(m => m.category === category) : rows).map(fmt));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

router.post("/menu", async (req, res) => {
  try {
    const { name, nameMr, category, price, description, ingredients, image, isPopular = false, isAvailable = true } = req.body;
    const [item] = await db.insert(menuItems).values({ name, nameMr, category, price, description, ingredients, image, isPopular, isAvailable }).returning();
    res.status(201).json(fmt(item));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

router.put("/menu/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;
    const [item] = await db.update(menuItems).set(updates).where(eq(menuItems.id, id)).returning();
    if (!item) return res.status(404).json({ error: "Menu item not found" });
    res.json(fmt(item));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

router.delete("/menu/:id", async (req, res) => {
  try {
    await db.delete(menuItems).where(eq(menuItems.id, parseInt(req.params.id)));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

export default router;
