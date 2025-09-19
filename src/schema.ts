import {
  mysqlTable,
  serial,
  int,
  varchar,
  datetime,
  date,
  json,
  float,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// Users
export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  createdAt: datetime("created_at").notNull(),
  username: varchar("username", { length: 20 }).notNull(),
  dateOfBirth: date("date_of_birth"),
});

// User Profiles
export const userProfiles = mysqlTable("user_profiles", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(), // FK to users
  firstName: varchar("first_name", { length: 35 }),
  lastName: varchar("last_name", { length: 35 }),
  title: varchar("title", { length: 35 }),
});

// Sessions
export const sessions = mysqlTable("sessions", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(), // FK to users
  createdAt: datetime("created_at").notNull(),
  duration: int("duration"), // seconds
  metadata: json("metadata"), // optional experiment metadata
});

// Controller Events (with optional position fields)
export const controllerEvents = mysqlTable("controller_events", {
  id: int("id").primaryKey().autoincrement(),
  sessionId: int("session_id").notNull(), // FK to sessions
  controller: mysqlEnum("controller", ["left", "right"]).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  timestamp: datetime("timestamp").notNull(),
  controllerPositions: json("controller_positions"),

  // optional details for complex data (e.g. button states, triggers, etc.)
  details: json("details"),
});
