import { supabase } from "./supabase";
import type { Agent, InsertAgent } from "../shared/schema";

export interface IStorage {
  getAgents(category?: string): Promise<Agent[]>;
  getAgent(id: string): Promise<Agent | null>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  voteAgent(id: string, direction: "up" | "down"): Promise<Agent | null>;
}

class SupabaseStorage implements IStorage {
  async getAgents(category?: string): Promise<Agent[]> {
    if (!supabase) throw new Error("Supabase not configured");

    let query = supabase
      .from("agents")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data as Agent[]) ?? [];
  }

  async getAgent(id: string): Promise<Agent | null> {
    if (!supabase) throw new Error("Supabase not configured");

    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data as Agent;
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    if (!supabase) throw new Error("Supabase not configured");

    const { data, error } = await supabase
      .from("agents")
      .insert({
        name: agent.name,
        description: agent.description,
        category: agent.category,
        github_url: agent.github_url || null,
        mcp_endpoint: agent.mcp_endpoint || null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Agent;
  }

  async voteAgent(
    id: string,
    direction: "up" | "down"
  ): Promise<Agent | null> {
    if (!supabase) throw new Error("Supabase not configured");

    const agent = await this.getAgent(id);
    if (!agent) return null;

    const field = direction === "up" ? "upvotes" : "downvotes";
    const { data, error } = await supabase
      .from("agents")
      .update({ [field]: agent[field] + 1 })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Agent;
  }
}

export const storage = new SupabaseStorage();
