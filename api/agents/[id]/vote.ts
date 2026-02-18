import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? "";
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, key);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const supabase = getSupabase();
    const id = req.query.id as string;
    const { direction } = req.body;

    if (direction !== "up" && direction !== "down") {
      return res.status(400).json({ message: "direction must be 'up' or 'down'" });
    }

    // Get current agent
    const { data: agent, error: getError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", id)
      .single();

    if (getError || !agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Update vote count
    const field = direction === "up" ? "upvotes" : "downvotes";
    const { data, error } = await supabase
      .from("agents")
      .update({ [field]: agent[field] + 1 })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ message: error.message });
    return res.json(data);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
