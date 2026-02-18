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
  const supabase = getSupabase();
  const id = req.query.id as string;

  if (req.method === "GET") {
    try {
      const user_id = req.query.user_id as string;
      if (!user_id) {
        return res.status(400).json({ message: "user_id query param required" });
      }

      const { data, error } = await supabase
        .from("saved_agents")
        .select("id")
        .eq("agent_id", id)
        .eq("user_id", user_id)
        .limit(1);

      if (error) return res.status(500).json({ message: error.message });
      return res.json({ saved: data && data.length > 0 });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ message: "user_id is required" });
      }

      // Check if already saved
      const { data: existing, error: checkError } = await supabase
        .from("saved_agents")
        .select("id")
        .eq("agent_id", id)
        .eq("user_id", user_id)
        .limit(1);

      if (checkError) return res.status(500).json({ message: checkError.message });

      if (existing && existing.length > 0) {
        // Already saved — unsave
        const { error: deleteError } = await supabase
          .from("saved_agents")
          .delete()
          .eq("agent_id", id)
          .eq("user_id", user_id);

        if (deleteError) return res.status(500).json({ message: deleteError.message });
        return res.json({ saved: false });
      } else {
        // Not saved — save
        const { error: insertError } = await supabase
          .from("saved_agents")
          .insert({ agent_id: id, user_id });

        if (insertError) return res.status(500).json({ message: insertError.message });
        return res.json({ saved: true });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
