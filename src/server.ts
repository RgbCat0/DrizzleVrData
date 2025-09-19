import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db"; // your drizzle db connection
import {
  sessions,
  controllerEvents,
} from "./schema";

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

    res.json({ success: true, sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to create session" });
  }
});

// --- Batch insert positions ---
app.post("/positions", async (req, res) => {
  try {
    const { sessionId, positions } = req.body;

    await db.insert(controllerEvents.).values(
      positions.map((p: any) => ({
        sessionId,
        controller: p.controller,
        timestamp: new Date(p.timestamp),
        posX: p.pos[0],
        posY: p.pos[1],
        posZ: p.pos[2],
        rotX: p.rot[0],
        rotY: p.rot[1],
        rotZ: p.rot[2],
        rotW: p.rot[3],
      }))
    );

    res.json({ success: true, count: positions.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to insert positions" });
  }
});

// --- Batch insert events ---
app.post("/events", async (req, res) => {
  try {
    const { sessionId, events } = req.body;

    await db.insert(controllerEvents).values(
      events.map((e: any) => ({
        sessionId,
        controller: e.controller,
        eventType: e.eventType,
        timestamp: new Date(e.timestamp),
        controllerPositions: e.controllerPositions ?? {},
        details: e.details ?? {},
      }))
    );

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
    const positions = await db
      .select()
      .from(controllerPositions)
      .where(controllerPositions.sessionId.eq(sessionId));

    const events = await db
      .select()
      .from(controllerEvents)
      .where(controllerEvents.sessionId.eq(sessionId));

    res.json({ sessionId, positions, events });
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
