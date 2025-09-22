import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db"; // your drizzle db connection
import {
  sessions,
  controllerEvents,
} from "./schema";
import { eq } from "drizzle-orm";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// test connection
app.get("/ping", (req, res) => {
  console.log("Ping received");
  res.send("pong");
});

// --- Sessions ---
app.post("/sessions", async (req, res) => {
  try {
    const { userId, metadata } = req.body;
    const [session] = await db
      .insert(sessions)
      .values({
        userId,
        createdAt: new Date(),
        metadata: metadata ?? {},
      })
      .$returningId();
console.log("Created session with ID:", session.id);
    res.json({ success: true, sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create session" });
  }
});


// --- Batch insert events ---
app.post("/events", async (req, res) => {
  try {
    const { sessionId, events } = req.body;
    // body has enum controller: "left" | "right" that doesnt insert correctly into the database it gives 0 (left) and  1 (right) instead of the string values which needs to be converted to string
    const stringifiedEvents = events.map((e: any) => ({
      ...e,
      controller: e.controller === 0 ? "left" : "right"
    }));

    await db.insert(controllerEvents).values(
      stringifiedEvents.map((e: any) => ({
        sessionId,
        controller: e.controller,
        eventType: e.eventType,
        timestamp: new Date(e.timestamp),
        controllerPositions: e.controllerPositions ?? null,
        details: e.details ?? null,
      }))
    );
    console.log(`Inserted ${events.length} events for session ${sessionId}`);

    res.json({ success: true, count: events.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to insert events" });
  }
});

// --- Example GET (fetch session data) ---
app.get("/sessions/:id", async (req, res) => {
  try {
    const sessionId = Number(req.params.id);
    const events = await db
      .select({
        id: controllerEvents.id,
        sessionId: controllerEvents.sessionId,
        controller: controllerEvents.controller,
        eventType: controllerEvents.eventType,
        timestamp: controllerEvents.timestamp,
        details: controllerEvents.details,
      })
      .from(controllerEvents)
      .where(eq(controllerEvents.sessionId, sessionId));
      console.log(`Fetched ${events.length} events for session ${sessionId}`);

    res.json({ sessionId, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch session" });
  }
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});
