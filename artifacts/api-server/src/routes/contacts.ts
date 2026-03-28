import { Router, type IRouter } from "express";
import { db, contacts } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();
const fmt = (c: typeof contacts.$inferSelect) => ({ ...c, createdAt: c.createdAt?.toISOString() });

router.get("/contacts", async (req, res) => {
  try {
    const rows = await db.select().from(contacts).orderBy(contacts.createdAt);
    res.json(rows.map(fmt));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const [contact] = await db.insert(contacts).values({ name, phone, email, message, status: "new" }).returning();
    res.status(201).json(fmt(contact));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes } = req.body;
    const [contact] = await db.update(contacts)
      .set({ ...(status && { status }), ...(notes !== undefined && { notes }) })
      .where(eq(contacts.id, id))
      .returning();
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(fmt(contact));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    await db.delete(contacts).where(eq(contacts.id, parseInt(req.params.id)));
    res.status(204).end();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

export default router;
