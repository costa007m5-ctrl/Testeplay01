import { mysqlTable, varchar, text, timestamp } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const settingsTable = mysqlTable("settings", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: text("value").notNull(),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});
