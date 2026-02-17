import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../../../server/storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const id = req.query.id as string;
    const { direction } = req.body;
    if (direction !== "up" && direction !== "down") {
      return res.status(400).json({ message: "direction must be 'up' or 'down'" });
    }
    const agent = await storage.voteAgent(id, direction);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    return res.json(agent);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
