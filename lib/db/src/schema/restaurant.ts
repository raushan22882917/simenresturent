import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ─── TABLES ──────────────────────────────────────────────────────────────────
export const restaurantTables = pgTable("restaurant_tables", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  capacity: integer("capacity").notNull().default(4),
  status: text("status").notNull().default("available"), // available | occupied | reserved | inactive
  qrCode: text("qr_code").notNull(),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTableSchema = createInsertSchema(restaurantTables).omit({ id: true, createdAt: true });
export type InsertTable = z.infer<typeof insertTableSchema>;
export type RestaurantTable = typeof restaurantTables.$inferSelect;

// ─── MENU ITEMS ───────────────────────────────────────────────────────────────
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameMr: text("name_mr"),
  category: text("category").notNull(), // starters | main | beverages | desserts | specials
  price: text("price").notNull(),
  description: text("description"),
  ingredients: text("ingredients"),
  image: text("image"),
  isPopular: boolean("is_popular").default(false).notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true, createdAt: true });
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type MenuItem = typeof menuItems.$inferSelect;

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  tableId: integer("table_id").notNull(),
  tableNumber: integer("table_number"),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  items: text("items").notNull(), // JSON string of ordered items
  totalAmount: text("total_amount"),
  status: text("status").notNull().default("pending"), // pending | confirmed | preparing | ready | completed | cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull().default(2),
  requests: text("requests"),
  status: text("status").notNull().default("pending"), // pending | confirmed | cancelled | completed
  tableId: integer("table_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// ─── CONTACTS ─────────────────────────────────────────────────────────────────
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  message: text("message"),
  status: text("status").notNull().default("new"), // new | read | replied | closed
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
