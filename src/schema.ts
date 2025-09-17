import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  meow: varchar("meow", { length: 255  }).notNull(),
  
});