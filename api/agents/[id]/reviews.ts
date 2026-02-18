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
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("agent_id", id)
        .order("created_at", { ascending: false });

      if (error) return res.status(500).json({ message: error.message });
      return res.json(data || []);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { user_id, user_name, rating, content } = req.body;

      if (!user_id || !user_name || !rating || !content) {
        return res.status(400).json({ message: "Missing required fields: user_id, user_name, rating, content" });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
      }

      // Insert the review
      const { data: review, error: insertError } = await supabase
        .from("reviews")
        .insert({
          agent_id: id,
          user_id,
          user_name,
          rating,
          content,
        })
        .select()
        .single();

      if (insertError) return res.status(500).json({ message: insertError.message });

      // Recalculate avg_rating and total_reviews for the agent
      const { data: allReviews, error: fetchError } = await supabase
        .from("reviews")
        .select("rating")
        .eq("agent_id", id);

      if (!fetchError && allReviews) {
        const total = allReviews.length;
        const avg = Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10) / 10;

        await supabase
          .from("agents")
          .update({ avg_rating: avg, total_reviews: total })
          .eq("id", id);
      }

      return res.status(201).json(review);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
