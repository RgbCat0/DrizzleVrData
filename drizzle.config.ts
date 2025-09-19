import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "mysql", // 👈 this is the new way
  dbCredentials: {
    host: "localhost",
    user: "drizzle",
    password: "drizzle123",
    database: "vrdata",
  },
} satisfies Config;