// Exporte seus modelos aqui. Um export por arquivo.
// export * from "./posts";
//
// Cada modelo/tabela deve ser separado em arquivos individuais.
// Cada modelo deve definir uma tabela Drizzle, insert schema e tipos:
//
//   import { mysqlTable, varchar, text, int } from "drizzle-orm/mysql-core";
//   import { createInsertSchema } from "drizzle-zod";
//   import { z } from "zod/v4";
//
//   export const postsTable = mysqlTable("posts", {
//     id: int("id").autoincrement().primaryKey(),
//     title: text("title").notNull(),
//   });
//
//   export const insertPostSchema = createInsertSchema(postsTable).omit({ id: true });
//   export type InsertPost = z.infer<typeof insertPostSchema>;
//   export type Post = typeof postsTable.$inferSelect;

export * from "./movies";
export * from "./settings";
