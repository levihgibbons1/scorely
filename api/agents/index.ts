import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const CATEGORIES = [
  "Development",
  "Coding",
  "Analytics",
  "Research",
  "Customer Service",
  "Marketing",
  "Productivity",
  "Other",
] as const;

const insertAgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  category: z.enum(CATEGORIES),
  github_url: z.string().url().optional().or(z.literal("")),
  mcp_endpoint: z.string().url().optional().or(z.literal("")),
  user_id: z.string().optional(),
});

function getSupabase() {
  const url = process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_ANON_KEY ?? "";
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, key);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const supabase = getSupabase();
      const category = req.query.category as string | undefined;
      let query = supabase
        .from("agents")
        .select("*")
        .order("created_at", { ascending: false });

      if (category && category !== "All") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) return res.status(500).json({ message: error.message });
      return res.json(data ?? []);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const parsed = insertAgentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("agents")
        .insert({
          name: parsed.data.name,
          description: parsed.data.description,
          category: parsed.data.category,
          github_url: parsed.data.github_url || null,
          mcp_endpoint: parsed.data.mcp_endpoint || null,
          user_id: parsed.data.user_id || null,
        })
        .select()
        .single();

      if (error) return res.status(500).json({ message: error.message });
      return res.status(201).json(data);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
