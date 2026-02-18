import { z } from "zod";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  github_url: string | null;
  mcp_endpoint: string | null;
  created_at: string;
  upvotes: number;
  downvotes: number;
  avg_rating: number | null;
  total_reviews: number;
  user_id: string | null;
}

export const CATEGORIES = [
  "Development",
  "Coding",
  "Analytics",
  "Research",
  "Customer Service",
  "Marketing",
  "Productivity",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<string, string> = {
  Development: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Coding: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Analytics: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Research: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Customer Service": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Marketing: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Productivity: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Other: "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
};

export const insertAgentSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().min(1, "Description is required").max(500),
  category: z.enum(CATEGORIES, { message: "Please select a category" }),
  github_url: z.string().url().optional().or(z.literal("")),
  mcp_endpoint: z.string().url().optional().or(z.literal("")),
  user_id: z.string().optional(),
});

export type InsertAgent = z.infer<typeof insertAgentSchema>;

export function getScore(agent: Agent): number {
  if (agent.avg_rating != null) return agent.avg_rating;
  const total = agent.upvotes + agent.downvotes;
  if (total === 0) return 0;
  return Math.round((agent.upvotes / total) * 50) / 10;
}
