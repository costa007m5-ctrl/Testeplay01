import { mysqlTable, int, text, float, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const moviesTable = mysqlTable("movies", {
  id: int("id").primaryKey(),
  title: text("title").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  overview: text("overview"),
  poster_path: text("poster_path"),
  backdrop_path: text("backdrop_path"),
  release_date: varchar("release_date", { length: 20 }),
  first_air_date: varchar("first_air_date", { length: 20 }),
  release_year: int("release_year"),
  rating: float("rating"),
  runtime: int("runtime"),
  genres: text("genres"),
  genre: text("genre"),
  video_url: text("video_url").default(""),
  logo_path: text("logo_path"),
  updated_at: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertMovieSchema = createInsertSchema(moviesTable);
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type Movie = typeof moviesTable.$inferSelect;
