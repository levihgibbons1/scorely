import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "./queryClient";
import type { Agent, InsertAgent } from "@shared/schema";

export interface Review {
  id: string;
  agent_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export function useAgents(category?: string) {
  return useQuery<Agent[]>({
    queryKey:
      category && category !== "All"
        ? ["/api/agents", category]
        : ["/api/agents"],
    queryFn: async () => {
      const url =
        category && category !== "All"
          ? `/api/agents?category=${encodeURIComponent(category)}`
          : "/api/agents";
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    staleTime: 30_000,
  });
}

export function useAgent(id: string) {
  return useQuery<Agent>({
    queryKey: ["/api/agents", id],
    queryFn: async () => {
      const res = await fetch(`/api/agents/${id}`, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateAgent() {
  return useMutation({
    mutationFn: async (data: InsertAgent) => {
      const res = await apiRequest("POST", "/api/agents", data);
      return res.json() as Promise<Agent>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });
}

export function useVoteAgent() {
  return useMutation({
    mutationFn: async ({
      id,
      direction,
    }: {
      id: string;
      direction: "up" | "down";
    }) => {
      const res = await apiRequest("POST", `/api/agents/${id}/vote`, {
        direction,
      });
      return res.json() as Promise<Agent>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });
}

// Reviews
export function useAgentReviews(agentId: string) {
  return useQuery<Review[]>({
    queryKey: ["/api/agents", agentId, "reviews"],
    queryFn: async () => {
      const res = await fetch(`/api/agents/${agentId}/reviews`, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    enabled: !!agentId,
    staleTime: 10_000,
  });
}

export function useSubmitReview() {
  return useMutation({
    mutationFn: async (data: {
      agent_id: string;
      user_id: string;
      user_name: string;
      rating: number;
      content: string;
    }) => {
      const res = await apiRequest("POST", `/api/agents/${data.agent_id}/reviews`, data);
      return res.json() as Promise<Review>;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents", variables.agent_id, "reviews"] });
      queryClient.invalidateQueries({ queryKey: ["/api/agents", variables.agent_id] });
      queryClient.invalidateQueries({ queryKey: ["/api/agents"] });
    },
  });
}

// Save / Bookmark
export function useAgentSaveStatus(agentId: string, userId: string | undefined) {
  return useQuery<{ saved: boolean }>({
    queryKey: ["/api/agents", agentId, "save", userId],
    queryFn: async () => {
      const res = await fetch(`/api/agents/${agentId}/save?user_id=${userId}`, { credentials: "include" });
      if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
      return res.json();
    },
    enabled: !!agentId && !!userId,
    staleTime: 30_000,
  });
}

export function useSaveAgent() {
  return useMutation({
    mutationFn: async (data: { agent_id: string; user_id: string }) => {
      const res = await apiRequest("POST", `/api/agents/${data.agent_id}/save`, {
        user_id: data.user_id,
      });
      return res.json() as Promise<{ saved: boolean }>;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/agents", variables.agent_id, "save"] });
    },
  });
}
