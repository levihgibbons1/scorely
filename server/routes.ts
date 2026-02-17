import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import { insertAgentSchema } from "../shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // GET /api/agents - List all agents, optionally filtered by category
  app.get("/api/agents", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const agents = await storage.getAgents(category);
      res.json(agents);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // GET /api/agents/:id - Get a single agent by ID
  app.get("/api/agents/:id", async (req, res) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) {
        res.status(404).json({ message: "Agent not found" });
        return;
      }
      res.json(agent);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST /api/agents - Create a new agent
  app.post("/api/agents", async (req, res) => {
    try {
      const parsed = insertAgentSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
        return;
      }
      const agent = await storage.createAgent(parsed.data);
      res.status(201).json(agent);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // POST /api/agents/:id/vote - Vote on an agent
  app.post("/api/agents/:id/vote", async (req, res) => {
    try {
      const { direction } = req.body;
      if (direction !== "up" && direction !== "down") {
        res
          .status(400)
          .json({ message: "direction must be 'up' or 'down'" });
        return;
      }
      const agent = await storage.voteAgent(req.params.id, direction);
      if (!agent) {
        res.status(404).json({ message: "Agent not found" });
        return;
      }
      res.json(agent);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  return httpServer;
}
