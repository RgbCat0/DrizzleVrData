import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "drizzle",
  password: "drizzle123",
  database: "testdb",
});

export const db = drizzle(pool);